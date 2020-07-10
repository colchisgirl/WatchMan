import React, { Component } from 'react'

import CommentsSection from '../Comments/Comments'

import { Link } from 'react-router-dom'
import FileUploadComponent from '../../FileUploadComponent';

export default class Event extends Component {
    constructor(props) {
        super(props)

        this.state = {
            event: [],
            title: "",
            description: "",
            user: ""

        }
    }

    componentDidMount = () => {
        const { event_id } = this.props.match.params

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
                                event: data,
                                title: data.title,
                                description: data.description,

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
                <div className="ldetails__container__path">/<Link to={`/landmarks/${event.landmark_id}`}> {event.landmark?.title} </Link> / {event.title} </div>
                <Link to={`/landmarks/${event.landmark_id}`}></Link>
                <div className="ldetails__container__data">
                    <div className="ldetails__container__title">
                        <h2>{event.title}</h2>
                    </div>
                    <hr className="ldetails__container__line"></hr>
                    <p>{event.description}</p>
                    <div className="ldetails__container__extra">
                    </div>
                    {event.images && event.images.length ?
                        <div className="ldetails__container__images">
                            <h3>Images</h3>
                            <div>
                                {event.images?.map((image, i) => {
                                    return (
                                        <div className="gallery-item" key={i}>
                                            <img className="gallery-image" src={image.url} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div> :
                        null}
                    <CommentsSection />
                </div>
            </>
        )
    }
}

