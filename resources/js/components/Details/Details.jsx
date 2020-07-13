import React, { Component } from "react";

import "./index.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Logo from "../Logo";
import Sidebar from "./Sidebar/Sidebar";
import Landmark from "./Landmark/Landmark";
import Event from "./Event/Event";
import NavItem from "../Home/Header/NavItem"
import CreateEvent from "./CreateEvent/CreateEvent";
import Notifications from '../Notifications'
import LogoutComponent from '../LoginComponent/LogoutComponent'
import UserDropdown from '../UserDropdown'
import Tracking from "./Landmark/Tracking";

export default class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            landmark: null
        };
    }

    componentDidMount = () => {
        const { landmark_id } = this.props.match.params;

        fetch(`/api/landmarks/${landmark_id}`, {
            headers: {
                Accept: "application/json", // we expect JSON as response
                "Content-Type": "application/json", // if we are sending something in the body, it is JSON
            }
        }).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    this.setState({
                        landmark: data
                    });
                });
            } else {
                if (response.status === 401) {
                    this.props.onFailedAuthentication();
                }
            }
        });
    };

    onTrackingChange = tracking => {
        this.setState({
            landmark: {
                ...this.state.landmark,
                tracking: tracking,
            }
        });
    };

    render() {
        const { landmark } = this.state;

        return (
            <div className="ldetails__container" >

                <div className="ldetails__container__landmark">
                    <nav className="ldetails__container__nav">
                        <Logo />
                        {
                            this.props.state.user ? (
                                <>
                                    <ul>
                                        <li><NavItem title="Home" path="/" /></li>
                                        <li><NavItem title="Map" path="/map" /></li>
                                        <li><NavItem title="Dashboard" path="/dashboard" /></li>
                                        <li><LogoutComponent state={this.props.state} /></li>
                                    </ul>
                                    <div className="ldetails__container__userInfo">
                                        <Notifications />
                                        <UserDropdown state={this.props.state} />
                                    </div>
                                </>
                            ) :
                                (
                                    <>
                                        <ul>
                                            <NavItem title="Login" path="/login" />
                                            <NavItem title="Register" path="/register" />
                                        </ul>
                                    </>
                                )
                        }
                    </nav>
                    <Switch>

                        <Route
                            path="/landmarks/:landmark_id/createEvent">
                            <CreateEvent {...this.props} />
                        </Route>

                        {/* <Route path="/landmarks/:landmark_id/:event_id">
                            <Event {...this.props}>
                                {this.props.state.user ?
                                    <Notifications /> :
                                    null}
                            </Event>
                        </Route> */}
                        <Route
                            path="/landmarks/:landmark_id/:event_id"
                            component={props => <Event {...props}
                                state={this.props.state}
                                component={this.props.state.user ?
                                    <Notifications /> :
                                    null} />}
                        />


                        <Route path="/landmarks/:landmark_id">
                            <Landmark landmark={landmark} {...this.props} state={this.props.state}>

                                {this.props.state.user ?
                                    <Tracking landmark={landmark} onTrackingChange={this.onTrackingChange} /> :
                                    null}

                            </Landmark>
                        </Route>
                    </Switch>
                </div>
                < Sidebar data={landmark} state={this.props.state} />

            </div>
        )
    }
}
