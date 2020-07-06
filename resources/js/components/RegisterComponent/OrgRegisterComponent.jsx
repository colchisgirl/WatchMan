import React from "react";
import InputComponent from "./InputComponent";

export default class OrgRegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        this.formRef = React.createRef();

        this.state = {
            name: "",
            email: "",
            password: "",
            address: "",
            description: "",
            errors: {},
            message: ""
        };
    }

    handleFormSubmit = e => {
        e.preventDefault();

        const formData = new FormData(this.formRef.current);
        const data = {};
        for (const pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }

        fetch("/api/organization/register", {
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
                else if (data.status === "success") {
                    // this.props.onLoginSuccess(data.data.token);
                    this.setState({
                        message: "You successfully signed up. Thanks for being awesome!"
                    })
                }
            });
    };

    render() {
        return (
            <div className="form_container org_sign_up_container">
                <form
                    method="POST"
                    action=""
                    onSubmit={this.handleFormSubmit}
                    ref={this.formRef}
                >

                    <div className="successmessage">{this.state.message}</div>

                    <InputComponent
                        id="orgname"
                        name="name"
                        label="Name of organization"
                        errors={this.state.errors}
                    />
                    <InputComponent
                        id="orgemail"
                        name="email"
                        errors={this.state.errors}
                    />
                    <InputComponent
                        id="orgpassword"
                        name="password"
                        type="password"
                        errors={this.state.errors}
                    />
                    <InputComponent
                        id="orgpasswordconfirm"
                        name="password_confirmation"
                        label="Confirm Password"
                        type="password"
                        errors={this.state.errors}
                    />
                    <InputComponent
                        id="orgaddress"
                        name="address"
                        errors={this.state.errors}
                    />
                    <InputComponent
                        id="orgdescription"
                        name="description"
                        label="Couple words about the organization"
                        type="textarea"
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
