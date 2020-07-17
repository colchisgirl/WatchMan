import React, { Component } from "react";

import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { Link } from "react-router-dom";

export default class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            readNotification: false,
        };
    }

    componentDidMount = () => {

        const sockId = Echo.socketId();
        if (this.props.state.socketId !== sockId) {
            this.props.state.liftStateUp(sockId);
        }

        Echo.private("notifications").listen("LandmarkEventCreated", e => {
            this.props.state.liftNotificationsStateUp([e.data, ...this.props.state.notifications]);
        });

        // setActiveNode = (echoId) => {
        //     this.setState({ socketId: echoId });
        //     this.props.liftStateUp(echoId);
        // }
        //we need to pass this id to appcomponent and then pass it to createEvent
    };

    readNotifications = () => {

        this.setState(prevState => ({
            readNotification: !prevState.readNotification
        }));




    };

    componentWillUnmount = () => {
        Echo.leaveChannel("notifications");
    };

    render() {

        return (
            <>
                <div
                    className="ldetails__container__notifications"
                    onClick={this.readNotifications} notifications={this.props.state}
                >
                    <Badge
                        badgeContent={this.props.state.notifications.length}
                        color="secondary"
                    >
                        <NotificationsIcon color="action" />
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

                            {this.props.state.notifications.length ? (
                                <ul>

                                    {this.props.state.notifications.map((notification, i) => (
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
                                    <p>There are no new notifications.</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
