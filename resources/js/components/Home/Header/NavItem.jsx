import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class NavItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <NavLink className="header__nav__item" activeClassName="active__navItem" to={this.props.path} >{this.props.title}</NavLink>
        )
    }
}
