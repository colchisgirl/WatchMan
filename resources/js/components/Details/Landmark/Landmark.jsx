<<<<<<< HEAD
import React, { Component } from 'react';

import Tracking from './Tracking';
import CommentsSection from '../Comments/Comments'


export default class Landmark extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { landmark } = this.props

        return (
            <>
                <Tracking {...this.props} />
                <div className="ldetails__container__data">
                    <div className="ldetails__container__title">
                        <h2>{landmark.title}</h2>

=======
import React, { Component } from "react";

export default class Landmark extends Component {

    render() {
        const { landmark } = this.props;

        return (
            <>
                {this.props.children}
                <div className="ldetails__container__data">
                    <div className="ldetails__container__title">
                        <h2>{landmark.title}</h2>
>>>>>>> c77dabe8719f9c7dd80640102bdd5aaca7052f14
                    </div>
                    <hr className="ldetails__container__line"></hr>
                    <p>{landmark.description}</p>
                    <div className="ldetails__container__extra">
                        <div>
                            Architect: <span>{landmark.architect}</span>
                        </div>
                        <div>
                            Built in <span>{landmark.built_in}</span>{" "}
                        </div>
                        <div>
                            Created by <span>{landmark.user?.name}</span>
                        </div>
                    </div>
                    <div className="ldetails__container__images">
                        <h3>Images</h3>
                        <div>
                            {landmark.images?.map((image, i) => {
                                return (
                                    <div className="gallery-item" key={i}>
                                        <img
                                            className="gallery-image"
                                            src={image.url}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <CommentsSection landmark={landmark.id} event={null} />
                </div>
            </>
        );
    }
}
