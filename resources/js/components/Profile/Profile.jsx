import React, { Component } from 'react'
import './index.scss'

import { Link } from 'react-router-dom'

import Logo from '../Logo'
import NavItem from "../Home/Header/NavItem"
import LogoutComponent from '../LoginComponent/LogoutComponent'
import EditUserPopup from './EditUserPopup'

import Moment from 'moment'

export default class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            editUser: false,
            user: props.state.user,
            landmarks: [],
            usersLandmarks: [],
            showMyLandmarks: true,
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
                                trackedLandmarks: data[0].tracking

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

    onEditSuccess = (data) => {
        this.setState({
            user: data,
            editUser: false
        });
        console.log(this.state.user);
    }

    showMyLandmarks = () => {
        this.setState({
            showMyLandmarks: true
        })
    }

    showTrackedLandmarks = () => {
        this.setState({
            showMyLandmarks: false
        })
    }


    render() {

        const { user } = this.state;
        const { landmarks, usersLandmarks, trackedLandmarks, userData, showMyLandmarks } = this.state;
        // console.log(trackedLandmarks[0].landmark.title)

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
                                        <img src={user?.profile_img} alt="" />
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
                                    <div className="container__profile__landmarks">
                                        <div className="landmarks__titles">
                                            <h3 className="title" onClick={this.showMyLandmarks}>My Landmarks</h3>
                                            <h3 className="title" onClick={this.showTrackedLandmarks}>Tracked Landmarks</h3>
                                        </div>
                                        {showMyLandmarks ? (
                                            <div >
                                                {usersLandmarks.length > 0 ?
                                                    <ul className="landmarks_listings">
                                                        {usersLandmarks.map((landmark, i) => {
                                                            return (
                                                                <li key={i} className="landmark__item">
                                                                    <p>{landmark.title}</p>
                                                                    <span><Link to={`/landmarks/${landmark.id}`}>Details</Link></span>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                    : (
                                                        <>
                                                            <p> No landmarks </p>
                                                            <p> If you want to create new landmark, click here! </p>
                                                        </>
                                                    )
                                                }
                                            </div>

                                        ) : (
                                                trackedLandmarks.length > 0 ? (
                                                    <ul className="landmarks_listings">
                                                        {trackedLandmarks.map((data, i) => {
                                                            return (
                                                                <li key={i} className="landmark__item">
                                                                    <p>{data.landmark.title}</p>
                                                                    <span><Link to={`/landmarks/${data.landmark.id}`}>Details</Link></span>
                                                                </li>
                                                            )

                                                        })}
                                                    </ul>
                                                ) : (
                                                        <p> No tracked landmarks </p>
                                                    )
                                            )
                                        }
                                    </div>
                                </section>
                            </div>

                            <section className="container__profile__aside">
                                <div className="container__profile__notifications">
                                    <h3 className="profile__section__title">Notifications</h3>
                                    <div id='listings' className='listings'>
                                        {this.state.notifications.map((notification, i) => (
                                            <div className="item" key={i}>
                                                <Link to={`/landmarks/${notification.event.landmark.id}/${notification.event_id}`}><h4 className="item__title">{notification.text}</h4></Link>
                                                <p>by {notification.user.name}</p>
                                            </div>
                                        ))}


                                    </div>
                                </div>
                            </section>
                        </div>

                        <section className="container__profile__bottom">
                            <h3 className="profile__section__title">All Landmarks</h3>
                            <div className="container__profile__allLandmarks">
                                <div className="content">
                                    {landmarks.map((landmark) => {
                                        return (
                                            <div className="container__profile__landmarkContainer">
                                                <div className="top landmark__popup__top">
                                                    <img className="landmark__popup__img" src={`${landmark.images[0]?.url}`} alt={`Picture of ${landmark.title}`} />
                                                </div>
                                                <div className="bottom">
                                                    <h3>{landmark.title}</h3>
                                                    <p><Link to={`/landmarks/${landmark.id}`}>Details</Link></p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </section>
                    </main>
                </div >

                {this.state.editUser ? <EditUserPopup toggle={this.togglePop} user={user} onEditSuccess={this.onEditSuccess} /> : null}
            </>
        )
    }
}