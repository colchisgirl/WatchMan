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
                </div>
            </>
        );
    }
}
