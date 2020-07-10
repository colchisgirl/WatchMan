import React, { Component } from 'react'


export default class Landmark extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tracked: true

        }
    }

    handleTrackingLandmark = () => {
        this.setState({
            tracked: (this.state.tracked ? false : true)
        })
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
            <>
                <div className="ldetails__container__data">
                    <div className="ldetails__container__title">
                        <h2>{landmark.title}</h2>
                        <div className="ldetails__container__buttons">
                            {tracking}
                        </div>
                    </div>
                    <hr className="ldetails__container__line"></hr>
                    <p>{landmark.description}</p>
                    <div className="ldetails__container__extra">
                        <div>Architect: <span>{landmark.architect}</span></div>
                        <div>Built in <span>{landmark.built_in}</span> </div>
                        <div>Created by <span>{landmark.user?.name}</span></div>
                    </div>
                    <div className="ldetails__container__images">
                        <h3>Images</h3>
                        <div>
                            {landmark.images?.map((image, i) => {
                                return (
                                    <div className="gallery-item" key={i}>
                                        <img className="gallery-image" src={image.url} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
