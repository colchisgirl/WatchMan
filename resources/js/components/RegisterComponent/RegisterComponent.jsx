import React from "react";
import ReactDOM from "react-dom";
import UserRegisterComponent from "./UserRegisterComponent.jsx";
import OrgRegisterComponent from "./OrgRegisterComponent.jsx";

export default class RegisterComponent extends React.Component {
    constructor() {
        super();
        this.state = { 
            render: "",
            isOrgPressed: false
        };
    }
    handleClick(compName, e) {
        this.setState({ render: compName });
    }
    renderSubComp() {
        switch (this.state.render) {
            case "organization":
                return <OrgRegisterComponent />;
            default:
                return <UserRegisterComponent />;
        }
    }
    
    isOrgPressed = this.state;
    
    rightOverlayActive = () => {
            this.setState({ isOrgPressed: true });
        };

    rightOverlayInactive = () => {
        this.setState({ isOrgPressed: false });
        };


    openUserForm = () => {
        this.handleClick.bind(this, "user");
    }

    openOrgForm = () => {
        this.handleClick.bind(this, "organization");
    }

    render() {

        return (
            <div className="App">
                <div className="container {`${isOrgPressed ? 'right_panel_active' : ''}`}" id="container">
                    <div className="overlay_container">
                        <div className="overlay">
                            <div className="overlay_panel overlay_left">
                                <button
                                    className="ghost"
                                    id="signUp"
                                    onClick={()=>{
                                    this.openUserForm(); 
                                    this.rightOverlayInactive(); }}>
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
                                        this.openOrgForm();
                                        this.rightOverlayActive(); }}>
                                    <h1>Sign Up as Organisation</h1>
                                </button>
                                <p>
                                    We help you watch over sustainable urban
                                    development
                                </p>
                            </div>
                        </div>
                    </div>

                    {this.renderSubComp()}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<RegisterComponent />, document.getElementById("app"));
