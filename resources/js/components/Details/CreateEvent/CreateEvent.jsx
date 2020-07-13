import React, { Component } from 'react';

import FileUploadComponent from '../../FileUploadComponent';

import TextField from '@material-ui/core/TextField';
import { Link, Redirect } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
export default class CreateEvent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            alarm: false,
            landmark_id: this.props.match.params.landmark_id,
            event_id: this.props.location.event_id || null

        }
    }

    handleCreateEventSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/events/create', {
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
        });

        const event = await response.json();
        this.setState({
            event_id: event.id
        });

    }


    render() {
        if (!this.props.state.user) {
            return <Redirect to="/login" />;
        }
        return (
            this.state.event_id
                ?
                <>
                    <h2>Event created! You can add a photo to event now.</h2>
                    <FileUploadComponent {...this.props} {...this.state} />

                    <Link to={`/landmarks/${this.state.landmark_id}/${this.state.event_id}`}><button>Take me to the event</button></Link>
                </>
                :
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
        )
    }
}