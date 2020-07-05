import React from "react";
import ReactDOM from "react-dom";
import "./RegisterComponent.scss";
import UserRegisterComponent from "./UserRegisterComponent.jsx";
import OrgRegisterComponent from "./OrgRegisterComponent.jsx";
import { Link } from "react-router-dom";
import Logo from '../Logo.jsx';

export default class RegisterComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            render: "",
            isOrgPressed: false
        };
    }
    // handleClick(compName) {
    //     this.setState({ render: compName });
    // }

    // renderSubComp() {
    //     switch (this.state.render) {
    //         case "organization":
    //             return <OrgRegisterComponent />;
    //         default:
    //             return <UserRegisterComponent />;
    //     }
    // }

    rightOverlayActive = () => {
        this.setState({ isOrgPressed: true });
    };

    rightOverlayInactive = () => {
        this.setState({ isOrgPressed: false });
    };

    render() {
        return (
            <div
                className={`container ${this.state.isOrgPressed ? 'right_panel_active' : ''}`}
                id="container"
            >
                <UserRegisterComponent />
                <OrgRegisterComponent />

                <div className='logo'>
                    <Logo />
                </div>

                <div className="multi-button">
                    <Link to="/" className="homebutton"><button>Home</button></Link>
                    <Link to="/login" className="loginbutton"><button>Log in</button></Link>
                </div>

                <div className="overlay_container">
                    <div className="overlay">
                        <div className="overlay_panel overlay_left">
                            <button
                                className="ghost"
                                id="signUp"
                                onClick={() => {
                                    this.rightOverlayInactive();
                                }}
                            >
                                <h1>Sign Up</h1>
                            </button>
                            <p>
                                Become a Watchman guardian of your city's
                                heritage
                            </p>
                        </div>
                        <div className="overlay_panel overlay_right">
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={() => {
                                    this.rightOverlayActive();
                                }}
                            >
                                <h1>Sign Up as Organisation</h1>
                            </button>
                            <p>
                                We help you watch over sustainable urban
                                development
                            </p>
                        </div>
                    </div>
                </div>

                {/* {this.renderSubComp()} */}
            </div>
        );
    }
}

// ReactDOM.render(<RegisterComponent />, document.getElementById("app"));
