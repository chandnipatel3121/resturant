import React, { useEffect, useRef, useMemo, useState } from "react"
import Globe from "react-globe.gl"

const CuisineGlobe = ({
    selectedCuisine,
    isPaused = false,
    themeColor,
    width = 200,
    height = 200
}) => {
    const globeRef = useRef()
    const [polygons, setPolygons] = useState([])
    const isFirstRender = useRef(true)

    // Load GeoJSON data asynchronously to prevent blocking the main thread
    useEffect(() => {
        const loadData = async () => {
            try {
                // Corrected paths to point to the root /data directory
                const [countriesRes, indiaRes] = await Promise.all([
                    fetch("/data/countries.geo.json"),
                    fetch("/data/india_state.json")
                ])
                
                if (!countriesRes.ok || !indiaRes.ok) {
                    throw new Error(`HTTP error! status: ${countriesRes.status} or ${indiaRes.status}`);
                }

                const countries = await countriesRes.json()
                const india = await indiaRes.json()

                setPolygons([...countries.features, ...india.features])
            } catch (err) {
                console.error("Failed to load globe data:", err)
            }
        }
        loadData()
    }, [])

    const cuisineMap = useMemo(() => ({
        Chinese: { country: "China", lat: 35, lng: 103, color: "#ff4d4d" },
        Italian: { country: "Italy", lat: 42, lng: 12, color: "#4da6ff" },
        Punjabi: { state: "Punjab", lat: 31, lng: 75, color: "#ff9933" },
        Gujarati: { state: "Gujarat", lat: 22.2587, lng: 71.1924, color: "#ff6b35" },
        SouthIndian: { state: "Tamil Nadu", lat: 11, lng: 78, color: "#00d4ff" }
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

    const normalizeName = (name) => name?.toLowerCase().trim();

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
                polygonAltitude={d => {
                    const name = normalizeName(d.properties.name || d.properties.NAME_1);
                    const targetCountry = normalizeName(activeCuisine?.country);
                    const targetState = normalizeName(activeCuisine?.state);
                    
                    if (name && (name === targetCountry || name === targetState)) return 0.2;
                    return 0.01;
                }}
                polygonCapColor={d => {
                    const name = normalizeName(d.properties.name || d.properties.NAME_1);
                    const targetCountry = normalizeName(activeCuisine?.country);
                    const targetState = normalizeName(activeCuisine?.state);

                    if (name && (name === targetCountry || name === targetState)) return themeColor || activeCuisine.color;
                    return "rgba(255,255,255,0.1)";
                }}
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