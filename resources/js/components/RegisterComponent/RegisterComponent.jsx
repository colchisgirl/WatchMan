import React from "react";
import ReactDOM from "react-dom";
import "./RegisterComponent.scss";
import UserRegisterComponent from "./UserRegisterComponent.jsx";
import OrgRegisterComponent from "./OrgRegisterComponent.jsx";
import { Link, Redirect } from "react-router-dom";
import Logo from '../Logo.jsx';
import NavItem from '../Home/Header/NavItem'

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
        this.setState({
            isOrgPressed: true
        });
    };

    rightOverlayInactive = () => {
        this.setState({
            isOrgPressed: false
        });
    };

    render() {

        if (this.props.state.user) {
            return <Redirect to="/" />;
        }

        return (
            <>
                <header className="header login_register_header">
                    <Logo />
                    <nav className="header__nav">
                        <ul className="header__nav__list">
                            <NavItem title="Home" path="/" />
                            <NavItem title="Login" path="/login" />
                        </ul>
                    </nav>

                </header>
                <div
                    className={`register ${this.state.isOrgPressed ? 'right_panel_active' : ''}`}
                    id="container"
                >
                    <div className="register_container">

                        <UserRegisterComponent />
                        <OrgRegisterComponent />


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
                    </div>
                </div>
            </>

        );
    }
}

// ReactDOM.render(<RegisterComponent />, document.getElementById("app"));
