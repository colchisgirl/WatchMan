import React, { Component } from 'react'

import './index.scss'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Logo from '../Logo'
import Sidebar from './Sidebar/Sidebar'
import Landmark from './Landmark/Landmark'
import Event from './Event/Event'

export default class LandmarkDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            landmark: []
        }
    }

    componentDidMount = () => {
        const { landmark_id } = this.props.match.params

        fetch(`/api/landmarks/${landmark_id}`, {
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
                                landmark: data
                            })
                        })
                } else {
                    if (response.status === 401) {
                        this.props.onFailedAuthentication()
                    }
                }
            })
    }

    handleTrackingLandmark = () => {
        this.setState({
            tracked: (this.state.tracked ? false : true)
        })
    }

    render() {

        const { landmark, options, tracked } = this.state

        return (
            <div className="ldetails__container">

                <div className="ldetails__container__logo">
                    <Logo />
                </div>

                <div className="ldetails__container__landmark">
                    <Switch>
                        <Route exact path="/landmarks/:landmark_id">
                            <Landmark landmark={landmark} />
                        </Route>
                        <Route path="/landmarks/:landmark_id/:event_id">
                            <Event />
                        </Route>
                    </Switch>
                </div>
                <Sidebar data={landmark} />

            </div>
        )
    }
}
