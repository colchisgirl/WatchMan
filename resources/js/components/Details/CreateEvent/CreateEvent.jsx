import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
export default class CreateEvent extends Component {
    constructor(props) {
        super(props)

        this.state = {

            title: '',
            description: '',
            alarm: false,
            landmark_id: this.props.match.params.landmark_id,
            data: null

        }
    }

    handleCreateEventSubmit = (event) => {
        event.preventDefault();

        fetch('/api/events/create', {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                alarm: this.state.alarm,
                landmark_id: this.state.landmark_id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then(response => {

            if (response.status == 200) {

                response.json()
                    .then(data => {

                        this.setState({
                            data: data
                        })
                    })
            } else {

                if (response.status == 401) {

                    this.props.onFailedAuthentication()
                }
            }
        })

    }


    render() {
        const { landmark_id } = this.state
        return (
            <>
                <div className="ldetails__container__path">/<Link to={`/landmarks/${this.state.landmark_id}`}> pes </Link> / New Event </div>
                <div className="event__container__create-form">
                    <h2>Create a new event</h2>
                    <form onSubmit={this.handleCreateEventSubmit}>


                        <TextField id="title_input"
                            label="Event Title"
                            value={this.state.title}
                            onChange={(e) => { this.setState({ title: e.target.value }) }}
                            variant="outlined" />
                        <br />
                        <TextField id="description_input"
                            label="Description"
                            value={this.state.description}
                            onChange={(e) => { this.setState({ description: e.target.value }) }}
                            variant="outlined" />

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </>
        )
    }
}
