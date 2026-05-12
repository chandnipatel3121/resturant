import React, { useEffect, useRef, useMemo, useState } from "react"
import Globe from "react-globe.gl"

// Global cache to prevent re-fetching and re-parsing large JSON files
let cachedPolygons = null;
let isFetching = false;
const fetchCallbacks = [];

const CuisineGlobe = ({
    selectedCuisine,
    isPaused = false,
    themeColor,
    width = 200,
    height = 200
}) => {
    const globeRef = useRef()
    const [polygons, setPolygons] = useState(cachedPolygons || [])
    const isFirstRender = useRef(true)

    // Load GeoJSON data with global caching
    useEffect(() => {
        if (cachedPolygons) {
            setPolygons(cachedPolygons);
            return;
        }

        if (isFetching) {
            fetchCallbacks.push(setPolygons);
            return;
        }

        const loadData = async () => {
            isFetching = true;
            try {
                const [countriesRes, indiaRes] = await Promise.all([
                    fetch("/data/countries.geo.json"),
                    fetch("/data/india_state.json")
                ])
                
                if (!countriesRes.ok || !indiaRes.ok) {
                    throw new Error(`HTTP error! status: ${countriesRes.status} or ${indiaRes.status}`);
                }

                const countries = await countriesRes.json()
                const india = await indiaRes.json()

                // Filter India features to only required states to save MASSIVE memory/CPU/Render time
                const requiredStates = ["punjab", "gujarat", "tamil nadu"];
                const filteredIndia = india.features.filter(f => {
                    const name = (f.properties.name || f.properties.NAME_1 || "").toLowerCase().trim();
                    return requiredStates.includes(name);
                });

                // Pre-normalize names ONCE for all features to save CPU cycles during render
                const allFeatures = [...countries.features, ...filteredIndia].map(f => ({
                    ...f,
                    properties: {
                        ...f.properties,
                        // Pre-calculate normalized name for O(1) matching later
                        _normalizedName: (f.properties.name || f.properties.NAME_1 || "").toLowerCase().trim()
                    }
                }));

                cachedPolygons = allFeatures;
                setPolygons(allFeatures);
                
                // Notify other instances waiting for data
                while (fetchCallbacks.length > 0) {
                    const cb = fetchCallbacks.shift();
                    cb(allFeatures);
                }
            } catch (err) {
                console.error("Failed to load globe data:", err)
            } finally {
                isFetching = false;
            }
        }
        loadData()
    }, [])

    const cuisineMap = useMemo(() => ({
        Chinese: { country: "china", lat: 35, lng: 103, color: "#ff4d4d" },
        Italian: { country: "italy", lat: 42, lng: 12, color: "#4da6ff" },
        Punjabi: { state: "punjab", lat: 31, lng: 75, color: "#ff9933" },
        Gujarati: { state: "gujarat", lat: 22.2587, lng: 71.1924, color: "#ff6b35" },
        SouthIndian: { state: "tamil nadu", lat: 11, lng: 78, color: "#00d4ff" }
    }), [])

    const activeCuisine = useMemo(() => cuisineMap[selectedCuisine], [selectedCuisine, cuisineMap])

    useEffect(() => {
        if (!globeRef.current || !activeCuisine) return

        // If it's the very first render or we've just switched, move POV
        globeRef.current.pointOfView(
            {
                lat: activeCuisine.lat,
                lng: activeCuisine.lng,
                altitude: 2.2
            },
            isFirstRender.current ? 0 : 1200 // Instant first time, smooth after
        )
        isFirstRender.current = false

        const controls = globeRef.current.controls()
        if (controls) {
            controls.autoRotate = !isPaused
            controls.autoRotateSpeed = 0.6
            controls.enableZoom = false
        }
    }, [activeCuisine, isPaused])

    // Memoize style functions to prevent re-creation on every render
    const polygonAltitude = useMemo(() => (d) => {
        const name = d.properties._normalizedName;
        if (name && (name === activeCuisine?.country || name === activeCuisine?.state)) return 0.2;
        return 0.01;
    }, [activeCuisine]);

    const polygonCapColor = useMemo(() => (d) => {
        const name = d.properties._normalizedName;
        if (name && (name === activeCuisine?.country || name === activeCuisine?.state)) {
            return themeColor || activeCuisine.color;
        }
        return "rgba(255,255,255,0.1)";
    }, [activeCuisine, themeColor]);

    return (
        <div
            style={{
                width,
                height,
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                pointerEvents: "none",
                background: `radial-gradient(circle, ${themeColor ? themeColor + '66' : 'rgba(0,0,0,0.2)'} 0%, rgba(0,0,0,0) 70%)`,
                boxShadow: themeColor ? `0 0 40px ${themeColor}44` : 'none',
                transition: 'all 0.5s ease'
            }}
        >
            <Globe
                ref={globeRef}
                width={width}
                height={height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                polygonsData={polygons}
                polygonAltitude={polygonAltitude}
                polygonCapColor={polygonCapColor}
                polygonSideColor={() => "rgba(255,255,255,0.05)"}
                polygonStrokeColor={() => "rgba(255,255,255,0.2)"}
                atmosphereColor={themeColor || "rgba(255,255,255,0.2)"}
                atmosphereAltitude={0.25}
                rendererConfig={{ antialias: true, alpha: true }}
            />
        </div>
    )
}

export default React.memo(CuisineGlobe)