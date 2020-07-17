import React, { Component } from 'react'

import { Link } from 'react-router-dom'

export default class UserDropdown extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        const { user } = this.props.state
        return (
            < >
                <Link to="/profile" className="userButton"><img src={user?.profile_img || '/img/home/no-photo-user.svg'} alt={user?.name} /></Link>
            </>
        )
    }
}
