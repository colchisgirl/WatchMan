import React, { Component } from "react";

export default class Tracking extends React.Component {

    handleTrackingLandmark = async e => {

        e.preventDefault();
        // this.state.tracked ?
        //send api to create new tracking :
        //send api to delete the tracking from database

        const response = await fetch(`/api/landmarks/${this.props.landmark.id}/tracking`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content")
            }
        });

        if (response.status >= 400 && response.status < 500) {
            // Redirect
        } else {
            const parsed = await response.json();
            this.props.onTrackingChange(parsed);
            console.log('successfully tracked');
        }
    };

    render() {

        const tracked = this.props.landmark?.tracking?.length;

        return (
            <div className="ldetails__container__buttons">
                {/* {tracking}
            </div> */}

                <button
                    className={`ldetails__container__tracking ${
                        tracked ? "tracked" : "track"
                        }`}
                    onClick={this.handleTrackingLandmark}
                >
                    {tracked ? "Watching" : "Watch"}
                </button>
            </div>
        );
    }
}
