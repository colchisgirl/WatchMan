
import React from 'react';
import './index.scss'

import { Link } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import ReactMapGL, { Marker, Popup, GeolocateControl, Pin } from 'react-map-gl'
import { ZoomControl, MapContext, Feature, Layer } from "react-mapbox-gl";
import Geocoder from 'react-map-gl-geocoder'
import ReactLoading from "react-loading";

import Sidebar from './Sidebar/Sidebar'
import UserDropdown from '../UserDropdown'
import PopupComponent from './PopupComponent'
import Notifications from '../Notifications'
import LogoutComponent from '../LoginComponent/LogoutComponent'

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
            loading: true,
            selectedLandmark: null,
            newLandmarkButtonClicked: false,
            data: [],
            marker: {
                latitude: 41.6978832,
                longitude: 44.7794575
            }
        }
        this.handleSidebarClick = this.handleSidebarClick.bind(this)
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
                                data: data,
                                loading: false
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

    handleClosePopup = () => {

        this.setState({
            selectedLandmark: null
        });
        console.log(this.state.selectedLandmark);
    }

    handleSidebarClick(e) {
        e.preventDefault();

        const landmark_id = parseInt(e.target.name);
        console.log(landmark_id)

        fetch(`/api/landmarks/${landmark_id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {

                if (response.status === 200) {

                    response.json()
                        .then(data => {

                            this.setState({
                                selectedLandmark: data
                            })
                        })
                } else {

                    if (response.status === 401) {

                        this.props.onFailedAuthentication()
                    }
                }
            })
        this.setState({ mounted: true })
    }



    render() {
        const { selectedLandmark, data, viewport, mounted } = this.state

        const userDropdown = (this.props.state.user ? (
            <>
                <Link to="/map/createLandmark"><button className="btn-new-landmark" onClick={this.onNewLandmarkClick}> + Add new landmark</button></Link>
                <Notifications />
                <UserDropdown state={this.props.state} />
                <LogoutComponent state={this.props.state} />
            </>
        ) : (
                null
            )
        )

        return (
            <div className="map__container" >
                <Sidebar data={data} state={this.props.state} marker={this.state.marker} action={this.handleSidebarClick} />

                <ReactMapGL
                    ref={this.mapRef}
                    {...viewport}
                    onViewportChange={(viewport) => {
                        this.setState({ viewport })
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
                        {userDropdown}
                    </div>

                    {this.state.newLandmarkButtonClicked === true ? (
                        <Marker
                            longitude={this.state.marker.longitude}
                            latitude={this.state.marker.latitude}
                            draggable
                            onDragEnd={this._onMarkerDragEnd}
                        >
                            <div class="new__marker">
                                <div class='pin'></div>
                                <div class='pulse'></div>
                            </div>

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
                                    e.preventDefault()
                                    this.setState({
                                        selectedLandmark: landmark
                                    })
                                }}
                            >
                                <img src={landmark.images[0]?.url} alt={landmark.title} />
                            </button>
                        </Marker>
                    ))}

                    {selectedLandmark ? (
                        <PopupComponent selectedLandmark={selectedLandmark} handleClosePopup={this.handleClosePopup} />

                    ) : null}

                </ReactMapGL>
            </div>
        )
    }
}
