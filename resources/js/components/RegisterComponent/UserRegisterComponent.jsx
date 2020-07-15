import React from "react";
import InputComponent from "./InputComponent";
import { Redirect } from "react-router-dom";

export default class UserRegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        this.formRef = React.createRef();

        this.state = {
            name: "",
            email: "",
            password: "",
            address: "",
            errors: {},
            message: "",
            redirect: null
        };
    }

    handleFormSubmit = e => {
        e.preventDefault();

        const formData = new FormData(this.formRef.current);
        const data = {};
        for (const pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }

        fetch("/api/user/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data && data.errors) {
                    this.setState({
                        errors: data.errors
                    });
                }
                if (data.status === "success") {
                    this.setState({
                        message: "You successfully signed up. Thanks for being awesome!",
                    })
                    setTimeout(() => {
                        this.setState({ redirect: "/login" });
                    }, 2000)
                    //     this.props.onLoginSuccess(data.data.token);
                }
            });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="form_container user_sign_up_container">
                <form
                    method="POST"
                    action=""
                    onSubmit={this.handleFormSubmit}
                    ref={this.formRef}
                >
                    <div className="successmessage">{this.state.message}</div>

                    <InputComponent
                        id="username"
                        name="name"
                        label="Full name"
                        errors={this.state.errors}
                    />
                    <InputComponent
                        id="useremail"
                        name="email"
                        label="Email"
                        errors={this.state.errors}
                    />
                    <InputComponent
                        id="userpassword"
                        name="password"
                        type="password"
                        label="Password"
                        errors={this.state.errors}
                    />
                    <InputComponent
                        id="userpasswordconfirm"
                        name="password_confirmation"
                        label="Confirm Password"
                        type="password"
                        errors={this.state.errors}
                    />
                    <InputComponent
                        id="useraddress"
                        name="address"
                        label="Address"
                        errors={this.state.errors}
                    />

                    <div className="auth_submit_button">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}
