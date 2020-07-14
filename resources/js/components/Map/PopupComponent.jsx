import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Popup } from 'react-map-gl'

export default class PopupComponent extends Component {
    render() {
        const { selectedLandmark } = this.props
        return (
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
                        <img className="landmark__popup__img" src={selectedLandmark.images[0].url} alt="" />
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
                                                {selectedLandmark.events[0].user?.name}
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
        )
    }
}
