import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Map from "../Map/Map.jsx";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import RegisterComponent from "../RegisterComponent/RegisterComponent";
import LoginFormComponent from "../LoginComponent/LoginFormComponent";

import Details from "../Details/Details";

export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            updateUser: this.updateUser,
            loading: true,
            socketId: "",
            liftStateUp: this.liftStateUp,
            liftNotificationsStateUp: this.liftNotificationsStateUp,
            notifications: []
        };
    }

    liftStateUp = (data) => {

        this.setState({ socketId: data})
      };

    liftNotificationsStateUp = (data) => {
        this.setState({ notifications: data })
    }

    updateUser = user => {
        this.setState({ user: user });
    };

    componentDidMount = async () => {
        const response = await fetch('/api/user', {
            headers: {
                'Accept': 'application/json', // we expect JSON as response
                'Content-Type': 'application/json', // if we are sending something in the body, it is JSON
            }
        });

        let user = null;

        if (response.status >= 200 && response.status < 400) {
            user = await response.json();
        }

        this.setState({
            user: user,
            loading: false
        });
    };

    render() {
        return this.state.loading ? (
            <h1>Loading...</h1>
        ) : (
                
                <Router>
                    {/* anything before switch wil be shared among pages  */}
                    <Switch>
                        <Route exact path="/">
                            <Home state={this.state} />
                        </Route>

                        <Route path="/map">
                            <Map state={this.state} {...this.props} socketId={this.state.socketId}/>
                        </Route>

                        <Route path="/profile">
                            <Profile state={this.state} />
                        </Route>

                        <Route
                            path="/landmarks/:landmark_id"
                            component={props => (
                                <Details {...props} state={this.state} />
                            )}
                        />

                        <Route path="/register">
                            <RegisterComponent state={this.state} />
                        </Route>

                        <Route path="/login">
                            <LoginFormComponent state={this.state} />
                        </Route>
                    </Switch>
                </Router>

               

            );
    }
}
