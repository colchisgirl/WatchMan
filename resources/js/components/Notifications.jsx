import React, { Component } from "react";

import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";

export default class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
            readNotification: false
        };
    }

    componentDidMount = () => {
        Echo.private("notifications").listen("LandmarkEventCreated", e => {
            this.setState({
                notifications: [e.data, ...this.state.notifications]
            });

        });

        const echoId = Echo.socketId(); //we need to pass this id to appcomponent and then pass it to createEvent
    };

    readNotifications = () => {
        this.setState(prevState => ({
            readNotification: !prevState.readNotification
        }));

        console.log(this.state.notifications)
    };

    componentWillUnmount = () => {
        Echo.leaveChannel("notifications");
    };

    render() {

        return (
            <>
                <div
                    className="ldetails__container__notifications"
                    onClick={this.readNotifications}
                >
                    <Badge
                        badgeContent={this.state.notifications.length}
                        color="secondary"
                    >
                        <NotificationsIcon />
                    </Badge>

                    <div
                        className={`notification ${
                            this.state.readNotification ? "shown" : "hidden"
                            }`}
                    >
                        <div className="dropdown__header">
                            <span className="triangle"></span>
                            <h2>Notifications</h2>
                        </div>
                        <div className="notifications__body">

                            {this.state.notifications.length ? (
                                <ul>

                                    {this.state.notifications.map((notification, i) => (
                                        <li key={i}>
                                            <Link
                                                to={`/landmarks/${notification.event.landmark_id}/${notification.event_id}`}
                                            >
                                                {notification.text}
                                            </Link>
                                        </li>
                                    )
                                    )}
                                </ul>
                            ) : (
                                    <h3>There are no new notifications</h3>
                                )
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
