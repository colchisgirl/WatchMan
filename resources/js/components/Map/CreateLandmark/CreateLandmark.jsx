import React, { Component } from 'react';

import FileUploadComponent from '../../FileUploadComponent';

// import TextField from './Input';
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
            architect: '',
            built_in: '',
            house_number: '',
            street: '',
            city: '',
            longitude: props.marker.longitude,
            latitude: props.marker.latitude,
            event_id: null
        }
    }

    handleCreateEventSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/landmarks/create', {
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                architect: this.state.architect,
                built_in: this.state.built_in,
                house_number: this.state.house_number,
                street: this.state.street,
                city: this.state.city,
                protected: true,
                latitude: this.state.latitude,
                longitude: this.state.longitude

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Authorization': 'Bearer ' + this.props.token
            }
        });

        const landmark = await response.json();
        this.setState({
            landmark_id: landmark.id
        });


    }


    render() {

        if (!this.props.state.user) {
            return <Redirect to="/login" />;
        }

        return (
            this.state.landmark_id
                ?
                <div className="newEvent__uploadImage__container">
                    <h2>Landmark created! You can add a photo to landmark now.</h2>
                    <FileUploadComponent {...this.props} {...this.state} />
                    <Link to={`/landmarks/${this.state.landmark_id}`}><button>Take me to the event</button></Link>
                </div>
                :
                <div className="landmark__container__create-form">
                    <h2>Create a new landmark</h2>
                    <form onSubmit={this.handleCreateEventSubmit}>


                        <TextField id="title_input"
                            label="Landmark Title"
                            value={this.state.title}
                            onChange={(e) => { this.setState({ title: e.target.value }) }}
                            variant="outlined" />

                        <TextField id="description_input"
                            label="Description"
                            value={this.state.description}
                            onChange={(e) => { this.setState({ description: e.target.value }) }}
                            variant="outlined" />

                        <TextField id="architect_input"
                            label="Architect"
                            value={this.state.architect}
                            onChange={(e) => { this.setState({ architect: e.target.value }) }}
                            variant="outlined" />

                        <TextField id="built_in_input"
                            label="Built in"
                            value={this.state.built_in}
                            onChange={(e) => { this.setState({ built_in: e.target.value }) }}
                            variant="outlined" />

                        <div>
                            <TextField id="house_number_input"
                                label="House Number"
                                value={this.state.house_number}
                                onChange={(e) => { this.setState({ house_number: e.target.value }) }}
                                variant="outlined" />
                            <TextField id="street_input"
                                label="Street"
                                value={this.state.street}
                                onChange={(e) => { this.setState({ street: e.target.value }) }}
                                variant="outlined" />
                        </div>

                        <TextField id="city_input"
                            label="City"
                            value={this.state.city}
                            onChange={(e) => { this.setState({ city: e.target.value }) }}
                            variant="outlined" />

                        <TextField id="city_input"
                            label="Longitude"
                            value={this.props.marker.longitude}

                            variant="outlined" />

                        <TextField id="city_input"
                            label="Latitude"
                            value={this.props.marker.latitude}

                            variant="outlined" />

                        <input type="submit" value="Submit" />
                    </form>
                </div>
        )
    }
}