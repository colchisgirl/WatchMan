import React, { Component } from 'react'

import NavItem from './NavItem';
import Logo from '../../Logo';

import LogoutComponent from '../../LoginComponent/LogoutComponent';


export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <Logo />
                <nav className="header__nav">
                    <ul className="header__nav__list">
                        <NavItem title="Home" path="/" />
                        {
                            this.props.state.user ?
                                <>
                                    <NavItem title="Profile" path="/profile" />
                                    <LogoutComponent state={this.props.state} />
                                </>
                                : (
                                    <>
                                        <NavItem title="Login" path="/login" />
                                        <NavItem title="Register" path="/register" />
                                    </>
                                )
                        }
                    </ul>
                </nav>

            </header>
        )
    }
}
