import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';

export default class EditUserPopup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.user.name,
            description: props.user.description,
            address: props.user.address
        }
    }

    handleClick = () => {
        this.props.toggle();
    };

    handleEditUser = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/profile/edit', {
            method: 'POST',
            body: JSON.stringify({
                user_id: this.props.user.id,
                name: this.state.name,
                description: this.state.description,
                address: this.state.address

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
                <div className="formPopup__container">
                    <span className="close" onClick={this.handleClick}> &times;    </span>
                    <h2>Edit Your Info</h2>
                    <form onSubmit={this.handleEditUser}>
                        <TextField id="username_input"
                            label="Name"
                            value={this.state.name}
                            onChange={(e) => { this.setState({ name: e.target.value }) }}
                            variant="outlined" />

                        <TextField id="userDescription_input"
                            label="Description"
                            value={this.state.description}
                            onChange={(e) => { this.setState({ description: e.target.value }) }}
                            variant="outlined" />

                        <TextField id="userAddress_input"
                            label="Address"
                            value={this.state.address}
                            onChange={(e) => { this.setState({ address: e.target.value }) }}
                            variant="outlined" />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div >
        );
    }
}