import React, { Component } from 'react'
import './index.scss'


import Logo from '../Logo'
import { NavLink } from 'react-router-dom'
import Notifications from '../Notifications'
import UserDropdown from '../UserDropdown'

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            landmarks: [],
            events: [],
            user_id: props.state.user?.id

        }
    }



    componentDidMount = () => {

        fetch(`/api/landmarks`, {
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
                                landmarks: data
                            })
                        })
                } else {
                    if (response.status === 401) {
                        this.props.onFailedAuthentication()
                    }
                }
            })

        fetch(`/api/${this.props.state.user?.id}/landmarks`, {
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
                                landmarks: data
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

        const { user } = this.props.state
        console.log(this.state.user_id);

        return (
            <div className="container__dashboard">
                <nav className="container__dashboard__nav">
                    <Logo />
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/map">Map</NavLink></li>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li>Logout</li>
                    </ul>
                    <div className="container__dashboard__user">
                        <Notifications />
                        <UserDropdown state={this.props.state} />
                    </div>
                </nav>
                <main>
                    <div className="container__dashboard__content">
                        <div className="container__dashboard__main">

                            <section className="container__dashboard__userInfo">
                                <h1>{user?.name}</h1>
                                <div className="container__dashboard__userInfoDiv">
                                    <p><span>Tracking:</span> 5 landmarks</p>
                                    <p><span>Created:</span> 1 landmark</p>
                                </div>
                            </section>
                            <section className="container__dashboard__myLandmarks">
                                My Landmarks
                       </section>
                            <section className="container__dashboard__watching">
                                Landmarks which Im tracking
                       </section>
                        </div>
                        <div className="container__dashboard__aside">
                            <section className="container__dashboard__notifications">
                                Notifications
                            </section>
                        </div>
                    </div>
                    <div className="container__dashboard__bottom">
                        <section className="container__dashboard__landmarks">
                            Landmarks
                        </section>
                    </div>
                </main>

            </div>
        )
    }
}
