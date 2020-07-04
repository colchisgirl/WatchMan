import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NavItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Link className="header__nav__item" to={this.props.path} >{this.props.title}</Link>
        )
    }
}
