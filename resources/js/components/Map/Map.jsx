
import React from 'react';
import './index.scss'

import { Link } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import ReactMapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'

import Sidebar from './Sidebar/Sidebar'
import UserDropdown from '../UserDropdown'

const MAPBOX_TOKEN = "pk.eyJ1IjoieWFuZWtrcmlzIiwiYSI6ImNrYnoxODl2aTBqbzEycm1yaW03NzdkM3AifQ.37oJsDI3o7haiPOyTBeg8w"

export default class Map extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            viewport: {
                latitude: 41.702605,
                longitude: 44.790558,
                width: '70%',
                height: '100vh',
                zoom: 13
            },
            selectedLandmark: null,
            data: [],
            mounted: false

        }
    }

    componentDidMount = () => {

        fetch('/api/landmarks', {
            headers: {
                'Accept': 'application/json', // we expect JSON as response
                'Content-Type': 'application/json', // if we are sending something in the body, it is JSON
            }
        })
            .then(response => {
                // if the response code is 200 (OK)
                if (response.status === 200) {
                    // parse it as JSON and do the typical stuff
                    response.json()
                        .then(data => {
                            // set the data into this component's state
                            this.setState({
                                data: data
                            })
                        })
                } else {
                    // otherwise react on the error code
                    if (response.status === 401) {
                        // signal to the App that authentication failed
                        this.props.onFailedAuthentication()
                    }
                }
            })
        this.setState({ mounted: true })
    }

    mapRef = React.createRef()

    handleViewportChange = (viewport) => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        })
    }

    handleGeocoderViewportChange = (viewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 }

        return this.handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides
        })
    }


    render() {
        const { selectedLandmark, data, viewport, mounted } = this.state

        const userDropdown = (this.props.state.user ? (
            <UserDropdown state={this.props.state} />
        ) : (
                null
            )
        )

        return (
            <div className="map__container">
                <Sidebar data={data} />

                <ReactMapGL
                    ref={this.mapRef}
                    {...viewport}
                    onViewportChange={(viewport) => {
                        if (mounted) { this.setState({ viewport }) }
                    }}
                    // mapStyle="mapbox://styles/yanekkris/ckbyxui8b3if51io1ecx6vaw4"
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    onClick={this.handleMapToggle}
                >

                    <Geocoder
                        className="searchbar"
                        mapRef={this.mapRef}
                        onViewportChange={this.handleGeocoderViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                    />

                    <div className="map__container__buttons">
                        <GeolocateControl
                            positionOptions={{ enableHighAccuracy: true }}
                            trackUserLocation={true}
                        />

                        {userDropdown}

                    </div>


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
                                    this.setState({
                                        selectedLandmark: landmark
                                    })
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
                        // onClose={
                        //     this.setState({
                        //         selectedLandmark: null
                        //     })
                        // }
                        >
                            <div className="landmark__popup">
                                <div className="landmark__popup__top">
                                    <img className="landmark__popup__img" src={`/img/${selectedLandmark.images[0].url}`} alt="" />
                                    <div className="landmark__popup__title">
                                        <h2>{selectedLandmark.title}</h2>
                                        <p>{selectedLandmark.house_number} {selectedLandmark.street}, {selectedLandmark.city}</p>
                                    </div>
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
                                            </a></p>
                                            <a href="#">more...</a>
                                        </>
                                    ) : (
                                            <p>No events</p>
                                        )}
                                </div>
                                <div className="landmark__popup__bottom">

                                    <Link to={`/landmarks/${selectedLandmark.id}/createEvent`} params={{ testvalue: "hello" }}>
                                        Add Event
                                    </Link>
                                    <Link to={`/landmarks/${selectedLandmark.id}`} params={{ testvalue: "hello" }}>
                                        See more details...
                                    </Link>


                                </div>
                            </div>
                        </Popup>
                    ) : null}
                </ReactMapGL>
            </div>
        )
    }
}

