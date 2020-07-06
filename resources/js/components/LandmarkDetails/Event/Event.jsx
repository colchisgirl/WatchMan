import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Event extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Link to={`/landmarks/${this.props.landmark.id}`}>Back</Link>
                <p>{this.props.landmark.architect}</p>
            </div>
        )
    }
}

