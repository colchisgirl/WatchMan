import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default class EditLandmarkPopup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: props.landmark.title,
            description: props.landmark.description,
            architect: props.landmark.architect,
            built_in: props.landmark.built_in,
            house_number: props.landmark.house_number,
            street: props.landmark.street,
            city: props.landmark.city
        }
    }

    handleClick = () => {
        this.props.toggle();
    };

    handleEditUser = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/landmarks/edit', {
            method: 'POST',
            body: JSON.stringify({
                landmark_id: this.props.landmark.id,
                title: this.state.title,
                description: this.state.description,
                architect: this.state.architect,
                built_in: this.state.built_in,
                house_number: this.state.house_number,
                street: this.state.street,
                city: this.state.city

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        });

        const data = await response.json()

        this.props.onEditSuccess(data)
    }

    render() {
        return (
            <div className="formPopup">
                <div className="formPopup__container editLandmark">
                    <span className="close" onClick={this.handleClick}> &times;    </span>
                    <h2>Edit Landmark Info</h2>
                    <form onSubmit={this.handleEditUser}>
                        <TextField id="landmarkTitle_input"
                            label="Title"
                            value={this.state.title}
                            onChange={(e) => { this.setState({ title: e.target.value }) }}
                            variant="outlined" />
                        <TextareaAutosize
                            rowsMax={5}
                            label="Title"
                            value={this.state.description}
                            onChange={(e) => { this.setState({ description: e.target.value }) }}
                        />
                        <TextField id="landmarkDesc_input"
                            label="Description"
                            value={this.state.description}
                            onChange={(e) => { this.setState({ description: e.target.value }) }}
                            variant="outlined" />

                        <TextField id="architect_input"
                            label="Architect"
                            value={this.state.architect}
                            onChange={(e) => { this.setState({ architect: e.target.value }) }}
                            variant="outlined" />
                        <TextField id="builtIn_input"
                            label="Built In"
                            value={this.state.built_in}
                            onChange={(e) => { this.setState({ built_in: e.target.value }) }}
                            variant="outlined" />
                        <div className="form__group">
                            <TextField id="houseNumber_input"
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
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div >
        );
    }
}