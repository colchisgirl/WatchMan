import React from 'react';

import TextField from '@material-ui/core/TextField';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    this.props.onLoginSuccess(data.data)
                }
            })
    }

    render() {
        return (
            <>
                <h2>Login</h2>
                <form action="" onSubmit={this.handleFormSubmit}>


                    <TextField
                        id={this.props.id || this.props.name}
                        type="Email"
                        name="email"
                        label="Email"
                        onChange={this.handleEmailChange}
                        value={this.state.email}
                        variant="outlined"
                        required
                        autoComplete={this.props.name}
                        autoFocus />
                    <TextField
                        id={this.props.id || this.props.name}
                        type="password"
                        name="password"
                        label="Password"
                        onChange={this.handlePasswordChange}
                        value={this.state.password}
                        variant="outlined"
                        required
                        autoComplete={this.props.name}
                        autoFocus />

                    <input type="submit" value="log in" />

                </form>
            </>
        )
    }
}