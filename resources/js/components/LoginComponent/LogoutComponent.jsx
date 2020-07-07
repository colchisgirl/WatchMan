import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Link, Redirect } from "react-router-dom";

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
            <a className="header__nav__item" href="#" onClick={this.logOutUser}>Log out</a>
        );
    }
}
