import React, { useEffect, useRef } from "react"
import Globe from "react-globe.gl"

import countries from "../data/countries.geo.json"
import indiaStates from "../data/india_state.geojson"

const CuisineGlobe = ({
    selectedCuisine,
    width = 140,
    height = 140
}) => {

    const globeRef = useRef()

    const cuisineMap = {

        Chinese: {
            country: "China",
            lat: 35,
            lng: 103,
            color: "#ff4d4d"
        },

        Italian: {
            country: "Italy",
            lat: 42,
            lng: 12,
            color: "#4da6ff"
        },

        Punjabi: {
            state: "Punjab",
            lat: 31,
            lng: 75,
            color: "#ff9933"
        },

        Gujarati: {
            state: "Gujarat",
            lat: 22.2587,
            lng: 71.1924,
            color: "#ff6b35"
        },

        SouthIndian: {
            state: "Tamil Nadu",
            lat: 11,
            lng: 78,
            color: "#00d4ff"
        }

    }

    const activeCuisine = cuisineMap[selectedCuisine]

    useEffect(() => {

        if (!globeRef.current || !activeCuisine) return

        globeRef.current.pointOfView(
            {
                lat: activeCuisine.lat,
                lng: activeCuisine.lng,
                altitude: 2.2
            },
            2000
        )

        globeRef.current.controls().autoRotate = true
        globeRef.current.controls().autoRotateSpeed = 0.5

    }, [selectedCuisine])

    return (

        <div
            style={{
                width,
                height,
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative"
            }}
        >

            <Globe
                ref={globeRef}

                width={width}
                height={height}

                backgroundColor="rgba(0,0,0,0)"

                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"

                polygonsData={[
                    ...countries.features,
                    ...indiaStates.features
                ]}

                polygonAltitude={d => {

                    if (
                        d.properties.name === activeCuisine?.country
                    ) {
                        return 0.12
                    }

                    if (
                        d.properties.NAME_1 === activeCuisine?.state
                    ) {
                        return 0.12
                    }

                    return 0.01
                }}

                polygonCapColor={d => {

                    if (
                        d.properties.name === activeCuisine?.country
                    ) {
                        return activeCuisine.color
                    }

                    if (
                        d.properties.NAME_1 === activeCuisine?.state
                    ) {
                        return activeCuisine.color
                    }

                    return "rgba(255,255,255,0.08)"
                }}

                polygonSideColor={() =>
                    "rgba(255,255,255,0.05)"
                }

                polygonStrokeColor={() =>
                    "rgba(255,255,255,0.15)"
                }

            />

        </div>
    )
}

export default CuisineGlobe