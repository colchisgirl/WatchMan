import React from "react";

export default class InputComponent extends React.Component {
    hasErrors = () => {
        return this.props.errors && this.props.errors[this.props.name];
    };

    render() {
        const errors = this.hasErrors();
        return (
            <div>
                <label htmlFor={this.props.name}>
                    {this.props.label || this.props.name}
                </label>
                {errors ? (
                    <div className="error">
                        {errors.map((error, i) => (
                            <div key={i}>*{error}</div>
                        ))}
                    </div>
                ) : null}
                <div>
                    {this.props.type === "textarea" ? (
                        <textarea
                            id={this.props.id || this.props.name}
                            name={this.props.name}
                            autoComplete={this.props.name}
                        />
                    ) : (
                        <input
                            id={this.props.id || this.props.name}
                            type={this.props.type || "text"}
                            name={this.props.name}
                            required
                            autoComplete={this.props.name}
                            autoFocus
                        />
                    )}
                </div>
            </div>
        );
    }
}
