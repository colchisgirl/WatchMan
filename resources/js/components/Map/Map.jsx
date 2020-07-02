import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import Loader from 'react-loader-spinner'
import './index.css'
import { Link } from 'react-router-dom'

import Sidebar from '../Sidebar/Sidebar'
import LandmarkDetails from '../LandmarkDetails/LandmarkDetails';


function App() {

    const [viewport, setViewport] = useState({
        latitude: 41.702605,
        longitude: 44.790558,
        width: '100vw',
        height: '100vh',
        zoom: 13
    })

    const [selectedLandmark, setSelectedLandmark] = useState(null)

    const [data, setData] = useState([]);

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        fetch('/api/landmarks', { signal: signal })
            .then(results => results.json())
            .then(data => {
                setData(data)
            })

        return function cleanup() {
            abortController.abort()
        }
    }, [])

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedLandmark(null)
            }
        }
        window.addEventListener("keydown", listener)

        return () => {
            window.removeEventListener("keydown", listener)
        }
    }, [])

    return (
        <>

            <Sidebar data={data} />

            <ReactMapGL {...viewport}
                onViewportChange={(viewport) => { setViewport(viewport) }}
                mapStyle="mapbox://styles/yanekkris/ckbyxui8b3if51io1ecx6vaw4"
                mapboxApiAccessToken='pk.eyJ1IjoieWFuZWtrcmlzIiwiYSI6ImNrYzN2NnVnejAxcXczMG52eXAyOTZqc3gifQ.nAxyG3TC3NkQickBqTgdEw'
            >

                {data.map((landmark) => (
                    <Marker
                        key={landmark.title}
                        latitude={parseFloat(landmark.latitude)}
                        longitude={parseFloat(landmark.longitude)}
                    >
                        <button
                            className="marker-btn"
                            onClick={e => {
                                e.preventDefault()
                                setSelectedLandmark(landmark)
                            }}
                        >
                            <img src={'img/' + landmark.images[0].url} alt="Skate Park Icon" />
                        </button>
                    </Marker>
                ))}

                {selectedLandmark ? (
                    <Popup
                        className="popup"
                        latitude={parseFloat(selectedLandmark.latitude)}
                        longitude={parseFloat(selectedLandmark.longitude)}
                    >
                        <div className="landmark__popup">
                            <div
                                className="landmark__popup__top"
                            >
                                <h2>{selectedLandmark.title}</h2>
                                <p>Address: {selectedLandmark.housenumber} {selectedLandmark.street}, {selectedLandmark.city}</p>
                            </div>
                            <div className="landmark__popup__middle">
                                <h3>Events</h3>

                                {selectedLandmark.events.length !== 0 ? (
                                    <>
                                        <p><a>
                                            {selectedLandmark.events[0].title}
                                            |
                                            {selectedLandmark.events[0].user.name}
                                            |
                                            22.6.2020
                                            </a>
                                        </p>
                                        <a href="#">more...</a>
                                    </>
                                ) : (
                                        <p>No events</p>
                                    )}
                            </div>
                            <div className="landmark__popup__bottom">

                                <Link to={`/landmarks/${selectedLandmark.id}/createEvent`}>
                                    Add Event
                                </Link>
                                <Link to={`/landmarks/${selectedLandmark.id}`}>
                                    See more details...
                                </Link>

                            </div>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </ >
    );
}

export default App;
