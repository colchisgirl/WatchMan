import React, { Component } from "react";

import "./index.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Logo from "../Logo";
import Sidebar from "./Sidebar/Sidebar";
import Landmark from "./Landmark/Landmark";
import Event from "./Event/Event";
import CreateEvent from "./CreateEvent/CreateEvent";
import Notifications from '../Notifications'

export default class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            landmark: []
        };
    }

    componentDidMount = () => {
        const { landmark_id } = this.props.match.params;

        fetch(`/api/landmarks/${landmark_id}`, {
            headers: {
                Accept: "application/json", // we expect JSON as response
                "Content-Type": "application/json", // if we are sending something in the body, it is JSON
                Authorization: "Bearer " + this.props.token
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

    render() {
        const { landmark } = this.state;

        return (
            <div className="ldetails__container" >

                <div className="ldetails__container__landmark">
                    <nav className="ldetails__container__nav">
                        <Logo />
                        <ul>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li>Profile</li>
                            <li>Logout</li>
                        </ul>
                        <Notifications />
                    </nav>
                    <Switch>

                        <Route
                            path="/landmarks/:landmark_id/createEvent">
                            <CreateEvent {...this.props} />
                        </Route>

                        <Route
                            path="/landmarks/:landmark_id/:event_id"
                            component={props => <Event {...props} />}
                        />

                        <Route path="/landmarks/:landmark_id">
                            <Landmark landmark={landmark} />
                        </Route>
                    </Switch>
                </div>
                < Sidebar data={landmark} />

            </div>
        )
    }
}
