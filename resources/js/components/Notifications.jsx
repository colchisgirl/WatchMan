import React, { Component } from "react";

import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";

export default class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        };
    }

    componentDidMount = () => {
        Echo.private("notifications").listen("LandmarkEventCreated", e => {
            this.setState({
                notifications: [e.data, ...this.state.notifications]
            });
        });
    };

    componentWillUnmount = () => {
        Echo.leaveChannel("notifications");
    };

    render() {
        return (
            <div className="ldetails__container__notifications">
                <Badge
                    badgeContent={this.state.notifications.length}
                    color="secondary"
                >
                    <NotificationsIcon />
                </Badge>
            </div>
        );
    }
}
