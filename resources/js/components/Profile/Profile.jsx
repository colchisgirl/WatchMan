import React, { Component } from 'react'
import './index.scss'

import { Link } from 'react-router-dom'

import Logo from '../Logo'
import NavItem from "../Home/Header/NavItem"
import LogoutComponent from '../LoginComponent/LogoutComponent'
import EditUserPopup from './EditUserPopup'

import { Switch, Route } from 'react-router-dom'

export default class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            editUser: false,
            user: props.state.user?.id,
            landmarks: [],
            usersLandmarks: [],
            trackedLandmarks: [],
            events: [],
            notifications: []

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
        fetch(`/api/profile`, {
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
                                notifications: data[0].notifications,
                                usersLandmarks: data[0].landmarks,
                                trackedLandmarks: data[0].tracking,

                            })
                        })
                } else {
                    if (response.status === 401) {
                        this.props.onFailedAuthentication()
                    }
                }
            })
    }

    togglePop = () => {
        this.setState({
            editUser: !this.state.editUser
        });
    };

    handleEditUser = (data) => {

        this.setState({
            user: true,
            user: data
        });
        this.props.state.updateUser(data.user);
    }


    render() {

        const { user } = this.props.state;
        const { landmarks, usersLandmarks, trackedLandmarks, userData } = this.state;

        if (userData === [])
            return "loading"

        return (
            <>
                <div className="container__profile">
                    <nav className="container__profile__nav">
                        <Logo />
                        <ul>
                            <li><NavItem title="Home" path="/" /></li>
                            <li><NavItem title="Map" path="/map" /></li>
                            <li><NavItem title="Profile" path="/profile" /></li>
                            <li><LogoutComponent state={this.props.state} /></li>
                        </ul>
                    </nav>
                    <main>
                        <div className="container__profile__content">
                            <div className="container__profile__main">
                                <section className="container__profile__userSection">
                                    <div className="container__profile__userImg">
                                        <img src="" alt="" />
                                        <div className="image__edit"><img src="/img/home/addUserImage.svg" alt="add photo icon" /> </div>
                                    </div>
                                    <div className="container__profile__userInfo">
                                        <h1>{user?.name}</h1>
                                        <p>{user?.description}</p>
                                        <div className="container__profile__userInfoDiv">
                                            {trackedLandmarks !== null ?
                                                <p><span>Tracking:</span> {trackedLandmarks.length} {trackedLandmarks.length > 1 ? 'landmarks' : 'landmark'}</p>
                                                :
                                                null
                                            }
                                            {usersLandmarks !== null ?
                                                <p><span>Created:</span> {usersLandmarks.length} {usersLandmarks.length > 1 ? 'landmarks' : 'landmark'}</p>
                                                :
                                                null
                                            }
                                        </div>
                                    </div>
                                    <div className="container__actions">
                                        <div className="edit"><button onClick={this.togglePop}><img src="/img/home/edit.svg" alt="edit icon" /></button></div>
                                    </div>
                                </section>
                                <section>
                                    <h3 className="profile__section__title">My Landmarks</h3>
                                    <div className="container__profile__myLandmarks">
                                        {usersLandmarks !== null ?
                                            usersLandmarks.map((landmark, i) => {
                                                return (
                                                    <div className="container__profile__landmarkContainer" key={i}>
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
                                <section className="container__profile__tracked">
                                    <h3 className="profile__section__title">Tracked Landmarks</h3>
                                    <div className="container__profile__watchingLandmarks">
                                    </div>
                                </section>
                            </div>

                            <section className="container__profile__aside">
                                <h3 className="profile__section__title">Notifications</h3>
                                <div className="container__profile__notifications">
                                    <div id='listings' className='listings'>
                                        {this.state.notifications.map((notification, i) => (
                                            <div className="item" key={i}>
                                                <Link to={`/landmarks/${notification.event.landmark.id}/${notification.event_id}`}><h4 className="item__title">{notification.text}</h4></Link>
                                                <p>{notification.created_at} by {notification.user.name}</p>
                                            </div>
                                        ))}


                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* <section className="container__profile__bottom">
                        <h3 className="profile__section__title">All Landmarks</h3>
                        <div className="container__profile__landmarks">
                            {landmarks.map((landmark) => {
                                return (
                                    <div className="container__profile__landmarkContainer">
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
                    </section> */}
                    </main>
                </div >

                {this.state.editUser ? <EditUserPopup toggle={this.togglePop} user={user} handleEditUser={this.handleEditUser} /> : null}
            </>
        )
    }
}