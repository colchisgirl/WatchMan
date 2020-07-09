import React, { Component } from 'react'

export default class UserDropdown extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            < >
                <button>{this.props.state.user?.name}</button>
            </>
        )
    }
}
