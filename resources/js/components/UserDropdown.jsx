import React, { Component } from 'react'

import { Link } from 'react-router-dom'

export default class UserDropdown extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            < >
                <Link to="/profile" className="userButton">{this.props.state.user?.name}</Link>
            </>
        )
    }
}
