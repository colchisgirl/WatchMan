import React from "react";

export default class OrgRegisterComponent extends React.Component {

    constructor(props) {
        super(props);

        this.formRef = React.createRef();

        
        this.state = {
            name: '',
            email: '',
            password: '',
            address: '',
            description: '',
            errors: []
        }
    }

    handleFormSubmit = (e) => {

        
        e.preventDefault();

        const formData = new FormData(this.formRef.current);
        const data = {};
        for (const pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }

        fetch('/api/organization/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    render() {
        return (
            <div className="form_container sign_in_container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Sign Up</div>

                            <div className="card-body">
                                <form method="POST" action="" onSubmit={ this.handleFormSubmit } ref={this.formRef} >

                                    <div className="form-group row">
                                        <label
                                            htmlFor="name"
                                            className="col-md-4 col-form-label text-md-right"
                                        >
                                            Name of the organization
                                        </label>

                                        <div className="col-md-6">
                                            <input
                                                id="name"
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                required
                                                autoComplete="name"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label
                                            htmlFor="email"
                                            className="col-md-4 col-form-label text-md-right"
                                        >
                                            Email
                                        </label>

                                        <div className="col-md-6">
                                            <input
                                                id="email"
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                required
                                                autoComplete="email"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label
                                            htmlFor="password"
                                            className="col-md-4 col-form-label text-md-right"
                                        >
                                            Password
                                        </label>

                                        <div className="col-md-6">
                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label
                                            htmlFor="password-confirm"
                                            className="col-md-4 col-form-label text-md-right"
                                        >
                                            Confirm Password
                                        </label>

                                        <div className="col-md-6">
                                            <input
                                                id="password-confirm"
                                                type="password"
                                                className="form-control"
                                                name="password_confirmation"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label
                                            htmlFor="address"
                                            className="col-md-4 col-form-label text-md-right"
                                        >
                                            Address
                                        </label>

                                        <div className="col-md-6">
                                            <input
                                                id="address"
                                                type="text"
                                                className="form-control"
                                                name="address"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label
                                            htmlFor="description"
                                            className="col-md-4 col-form-label text-md-right"
                                        >
                                            A couple words about the organization
                                        </label>

                                        <div className="col-md-6">
                                            <textarea
                                                id="description"
                                                type="text"
                                                className="form-control"
                                                name="description"
                                                autoComplete="description"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-6 offset-md-4">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
