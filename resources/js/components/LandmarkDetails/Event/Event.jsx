import React, { Component } from 'react'

import CommentsSection from '../Comments/Comments'

import { Link } from 'react-router-dom'

export default class Event extends Component {
    constructor(props) {
        super(props)

        this.state = {
            event: []

        }
    }

    componentDidMount = () => {
        const { event_id } = this.props.match.params
        console.log(event_id);

        fetch(`/api/events/${event_id}`, {
            headers: {
                'Accept': 'application/json', // we expect JSON as response
                'Content-Type': 'application/json', // if we are sending something in the body, it is JSON
                'Authorization': 'Bearer ' + this.props.token
            }
        })
            .then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(data => {
                            this.setState({
                                event: data
                            })
                        })
                } else {
                    if (response.status === 401) {
                        this.props.onFailedAuthentication()
                    }
                }
            })
    }


    render() {
        const { event } = this.state

        return (
            <>
                <Link to={`/landmarks/${event.landmark_id}`}>Back</Link>
                <div className="ldetails__container__data">
                    <div className="ldetails__container__title">
                        <h2>{event.title}</h2>
                    </div>
                    <hr className="ldetails__container__line"></hr>
                    <p>{event.description}</p>
                    <div className="ldetails__container__extra">
                    </div>
                    <div className="ldetails__container__images">
                        <h3>Images</h3>
                        {console.log(event.images)}
                        <div>
                            {event.images?.map((image) => {
                                return (
                                    <div class="gallery-item">
                                        <img src={`/img/${image.url}`} />
                                    </div>
                                )
                            })}
                            <div className="gallery-item"><img className="gallery-image" src={`/img/rustaveli_54.jpg`} /></div>
                            <div className="gallery-item"><img className="gallery-image" src={`/img/rome_4.jpg`} /></div>
                            <div className="gallery-item"><img className="gallery-image" src={`/img/giorgi_mazniashvili_16.jpg`} /></div>

                        </div>
                    </div>
                    <CommentsSection />
                </div>
            </>
        )
    }
}

