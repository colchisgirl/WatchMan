import React, { Component } from 'react'

export default class Tracking extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tracked: false

        }
    }

    handleTrackingLandmark = () => {
        this.setState({
            tracked: (this.state.tracked ? false : true)
        })

        // this.state.tracked ?
        //send api to create new tracking :
        //send api to delete the tracking from database

    }


    render() {
        const { tracked } = this.state
        const { landmark } = this.props

        const tracking =
            (tracked ?
                <button className="ldetails__container__tracking track" onClick={this.handleTrackingLandmark}>Track</button>
                :
                <button className="ldetails__container__tracking tracked" onClick={this.handleTrackingLandmark}>Tracked</button>
            )

        return (
            <div className="ldetails__container__buttons">
                {tracking}
            </div>
        )
    }
}