import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Link, Redirect } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default class LogoutComponent extends Component {

    logOutUser = async () => {
        const response = await fetch("/api/logout", {
            method: "POST",
            credentials: 'same-origin'
        });
        if (response.ok) {
            this.props.state.updateUser(null);
        }
    };

    render() {
        return (
            <a href="#" onClick={this.logOutUser}><ExitToAppIcon color="action" /></a>
        );
    }
}
