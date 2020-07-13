import React, { Component } from "react";

import CommentsSection from "../Comments/Comments";

import { Link } from "react-router-dom";
import FileUploadComponent from "../../FileUploadComponent";

export default class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: {},
            title: "",
            description: "",
            user: "",
            images: []
        };
    }

    componentDidMount = () => {
        const { event_id } = this.props.match.params;

        fetch(`/api/events/${event_id}`, {
            headers: {
                Accept: "application/json", // we expect JSON as response
                "Content-Type": "application/json", // if we are sending something in the body, it is JSON
                Authorization: "Bearer " + this.props.token
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    this.setState({
                        event: data,
                        title: data.title,
                        description: data.description,
                        images: data.images.slice(0, 6)
                    });
                });
            } else {
                if (response.status === 401) {
                    this.props.onFailedAuthentication();
                }
            }
        });
    };

    showMoreImages = () => {
        this.setState({
            images: this.state.event.images.slice(0, this.state.images.length + 6)
        });
    };

    render() {
        const { event } = this.state;

        return (
            <>
                <div className="ldetails__container__path">
                    /
                    <Link to={`/landmarks/${event.landmark_id}`}>
                        {" "}
                        {event.landmark?.title}{" "}
                    </Link>{" "}
                    / {event.title}{" "}
                </div>
                <Link to={`/landmarks/${event.landmark_id}`}></Link>
                <div className="ldetails__container__data">
                    <div className="ldetails__container__title">
                        <h2>{event.title}</h2>
                    </div>
                    <hr className="ldetails__container__line"></hr>
                    <p>{event.description}</p>
                    <div className="ldetails__container__extra"></div>
                    {this.state.images.length ? (
                        <div className="ldetails__container__images">
                            <h3>Images</h3>
                            <Link
                                to={{
                                    pathname: `/landmarks/${event.landmark_id}/createEvent`,
                                    event_id: event.id
                                }}
                            >
                                + Add more images
                            </Link>
                            <div>
                                {this.state.images.map((image, i) => {
                                    return (
                                        <div className="gallery-item" key={i}>
                                            <img
                                                className="gallery-image"
                                                src={image.url}
                                            />
                                        </div>
                                    );
                                })}
                                {
                                    this.state.images.length !== event.images.length
                                        ? <button onClick={this.showMoreImages}>Show more...</button>
                                        : null
                                }
                            </div>
                        </div>
                    ) : null}
                    <CommentsSection landmark_id={null} event_id={event.id} state={this.props.state} />
                </div>
            </>
        );
    }
}
