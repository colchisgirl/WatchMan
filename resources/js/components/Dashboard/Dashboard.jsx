import React, { Component } from 'react'
import './index.scss'

import { Link } from 'react-router-dom'

import Logo from '../Logo'
import Notifications from '../Notifications'
import UserDropdown from '../UserDropdown'
import NavItem from "../Home/Header/NavItem"
import LogoutComponent from '../LoginComponent/LogoutComponent'

export default class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            landmarks: [],
            usersLandmarks: [],
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
                                usersLandmarks: data
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



        const { user } = this.props.state;
        const { landmarks, usersLandmarks } = this.state;
        
        return (
            <div className="container__dashboard">
                <nav className="container__dashboard__nav">
                    <Logo />
                    <ul>
                        <li><NavItem title="Home" path="/" /></li>
                        <li><NavItem title="Map" path="/map" /></li>
                        <li><NavItem title="Dashboard" path="/dashboard" /></li>
                        <li><LogoutComponent state={this.props.state} /></li>
                    </ul>
                    <div className="container__dashboard__user">
                        <Notifications />
                        <UserDropdown state={this.props.state} />
                    </div>
                </nav>
                <main>
                    <div className="container__dashboard__content">
                        <div className="container__dashboard__main">
                            <section>
                                <div className="container__dashboard__userInfo">
                                    <h1>{user?.name}</h1>
                                    <div className="container__dashboard__userInfoDiv">
                                        <p><span>Tracking:</span> 5 landmarks</p>
                                        <p><span>Created:</span> 1 landmark</p>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h3 className="dashboard__section__title">My Landmarks</h3>
                                <div className="container__dashboard__myLandmarks">

                                    {usersLandmarks !== [] ?
                                        usersLandmarks.map((landmark, i) => {
                                            return (
                                                <div className="container__dashboard__landmarkContainer" key={i}>
                                                    <div className="top landmark__popup__top">
                                                        <img className="landmark__popup__img" src={landmark.images[0]?.url} alt={`Picture of ${landmark.title}`} />
                                                    </div>
                                                    <div className="bottom">
                                                        <h3>{landmark.title}</h3>
                                                        <p><Link to={`/landmarks/${landmark.id}`}>Details</Link></p>
                                                    </div>

                                                </div>
                                            )
                                        })
                                        : (
                                            <p> No landmarks </p>
                                        )
                                    }
                                </div>
                            </section>
                            <section className="container__dashboard__tracked">
                                <h3 className="dashboard__section__title">Tracked Landmarks</h3>
                                <div className="container__dashboard__watchingLandmarks">
                                    no landmarks
                                </div>
                            </section>
                        </div>
                        <section className="container__dashboard__aside">
                            <h3 className="dashboard__section__title">Notifications</h3>
                            <div className="container__dashboard__notifications">
                                <div id='listings' className='listings'>
                                    <div className="item">
                                        <h4 className="item__title">New event was added.</h4>
                                        <p>10/7/2020 </p>
                                    </div>
                                    <div className="item">
                                        <h4 className="item__title">Enrigue commented your event.</h4>
                                        <p>8/7/2020 </p>
                                    </div>
                                    <div className="item">
                                        <h4 className="item__title">New event was added to your tracked landmark</h4>
                                        <p>2/7/2020 </p>
                                    </div>
                                    <div className="item">
                                        <h4 className="item__title">New event was added.</h4>
                                        <p>10/7/2020 </p>
                                    </div>
                                    <div className="item">
                                        <h4 className="item__title">Enrigue commented your event.</h4>
                                        <p>8/7/2020 </p>
                                    </div>
                                    <div className="item">
                                        <h4 className="item__title">New event was added to your tracked landmark</h4>
                                        <p>2/7/2020 </p>
                                    </div>
                                    <div className="item">
                                        <h4 className="item__title">New event was added.</h4>
                                        <p>10/7/2020 </p>
                                    </div>
                                    <div className="item">
                                        <h4 className="item__title">Enrigue commented your event.</h4>
                                        <p>8/7/2020 </p>
                                    </div>
                                    <div className="item">
                                        <h4 className="item__title">New event was added to your tracked landmark</h4>
                                        <p>2/7/2020 </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <section className="container__dashboard__bottom">
                        <h3 className="dashboard__section__title">All Landmarks</h3>
                        <div className="container__dashboard__landmarks">
                            {landmarks.map((landmark, i) => {
                                return (
                                    <div key={i} className="container__dashboard__landmarkContainer">
                                        <div className="top landmark__popup__top">
                                            <img className="landmark__popup__img" src={`/img/${landmark.images[0]?.url}`} alt={`Picture of ${landmark.title}`} />
                                        </div>
                                        <div className="bottom">
                                            <h3>{landmark.title}</h3>
                                            <p><Link to={`/landmarks/${landmark.id}`}>Details</Link></p>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </section>
                </main>

            </div>
        )
    }
}