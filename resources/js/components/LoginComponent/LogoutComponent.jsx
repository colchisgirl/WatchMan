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
            <a href="#" onClick={this.logOutUser}><img className=" logout__icon icons" src="/img/home/logout_3.svg" /></a>
        );
    }
}
