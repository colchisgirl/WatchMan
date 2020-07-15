import React from "react";

import TextField from '@material-ui/core/TextField';

export default class InputComponent extends React.Component {
    hasErrors = () => {
        return this.props.errors && this.props.errors[this.props.name];
    };

    render() {
        const errors = this.hasErrors();
        return (
            <div>
                {errors ? (
                    <div className="error">
                        {errors.map((error, i) => (
                            <div key={i}>*{error}</div>
                        ))}
                    </div>
                ) : null}
                <div className="registration__input">
                    {this.props.type === "textarea" ? (
                        <>
                            <label>
                                {this.props.label}
                            </label>
                            <textarea
                                id={this.props.id || this.props.name}
                                name={this.props.name}
                                autoComplete={this.props.name}
                            />
                        </>
                    ) : (
                            // <input
                            //     id={this.props.id || this.props.name}
                            //     type={this.props.type || "text"}
                            //     name={this.props.name}
                            //     required
                            //     autoComplete={this.props.name}
                            //     autoFocus
                            // />
                            <TextField id={this.props.id || this.props.name}
                                label={this.props.label}
                                type={this.props.type || "text"}
                                name={this.props.name}
                                variant="outlined"
                                required
                                autoComplete={this.props.name}
                                autoFocus />
                        )}
                </div>
            </div>
        );
    }
}
