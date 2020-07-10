
import React from 'react';
import './index.scss'

import { Link } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import ReactMapGL, { Marker, Popup, GeolocateControl, Pin } from 'react-map-gl'
import { ZoomControl, MapContext, Feature, Layer } from "react-mapbox-gl";
import Geocoder from 'react-map-gl-geocoder'

import Sidebar from './Sidebar/Sidebar'
import UserDropdown from '../UserDropdown'
import PopupComponent from './PopupComponent'

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
            newLandmarkButtonClicked: false,
            data: [],
            marker: {
                latitude: 41.703605,
                longitude: 44.790558
            },

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

    //new draggable landmark 
    _onMarkerDragEnd = (event) => {
        this._logDragEvent('onDragEnd', event);
        this.setState({
            marker: {
                longitude: event.lngLat[0],
                latitude: event.lngLat[1],
            }
        });

    };

    _logDragEvent(name, event) {
        this.setState({
            events: {
                ...this.state.events,
                [name]: event.lngLat,
            }
        })
    }

    onNewLandmarkClick = () => {
        this.setState({
            newLandmarkButtonClicked: true
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

            <div className="map__container" >
                <Sidebar data={data} state={this.props.state} marker={this.state.marker} />

                <ReactMapGL
                    ref={this.mapRef}
                    {...viewport}
                    onViewportChange={(viewport) => {
                        if (mounted) { this.setState({ viewport }) }
                    }}
                    // mapStyle="mapbox://styles/yanekkris/ckbyxui8b3if51io1ecx6vaw4"
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                    onClick={this.handleMapToggle}
                    getMap={(map) => { console.log('map objeckt', map); }}
                >


                    <Geocoder
                        className="searchbar"
                        mapRef={this.mapRef}
                        onViewportChange={this.handleGeocoderViewportChange}
                        mapboxApiAccessToken={MAPBOX_TOKEN}
                    />

                    <div className="map__container__buttons">
                        {/* <GeolocateControl
                            positionOptions={{ enableHighAccuracy: true }}
                            trackUserLocation={true}
                        /> */}
                        <Link to="/map/createLandmark"><button className="btn-new-landmark" onClick={this.onNewLandmarkClick}> + Add new landmark</button></Link>
                    </div>

                    {this.state.newLandmarkButtonClicked === true ? (
                        <Marker
                            longitude={this.state.marker.longitude}
                            latitude={this.state.marker.latitude}
                            draggable
                            onDragEnd={this._onMarkerDragEnd}
                        >
                            <p>this is that fucking marker</p>
                        </Marker>
                    ) : null}

                    {data.map((landmark) => (
                        <Marker
                            key={landmark.id}
                            latitude={parseFloat(landmark.latitude)}
                            longitude={parseFloat(landmark.longitude)}
                        >
                            <button
                                className="marker-btn"
                                onClick={e => {
                                    //e.preventDefault()
                                    //this.setState({
                                    //  selectedLandmark: landmark
                                    //})
                                }}
                            >
                                {/* <img src={'/img/' + landmark.images[0].url} alt="Skate Park Icon" /> */}
                                <p>{landmark.id}</p>
                            </button>
                        </Marker>
                    ))}

                    {selectedLandmark ? (
                        <PopupComponent selectedLandmark={selectedLandmark} />

                    ) : null}

                </ReactMapGL>
            </div>
        )
    }
}
