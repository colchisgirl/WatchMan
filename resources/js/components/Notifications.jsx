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
            //console.log(this.state.notifications[0].event_id);
        });
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
                    onClick={this.readNotifications}
                >
                    <Badge
                        badgeContent={this.state.notifications.length}
                        color="secondary"
                    >
                        <NotificationsIcon />
                    </Badge>
                </div>

                <div
                    className={`notification ${
                        this.state.readNotification ? "shown" : "hidden"
                    }`}
                >
                    {this.state.notifications.length ? (
                        <ul>
                            {this.state.notifications.map((notification, i) => (
                                    <Link
                                        to={`/events/${notification.event_id}`}
                                    >
                                        <li key={i}>{notification.text}</li>
                                    </Link>
                                )
                            )}
                        </ul>
                    ) : (
                        <h3>There are no new notifications</h3>
                    )
                    }
                </div>
            </>
        );
    }
}
