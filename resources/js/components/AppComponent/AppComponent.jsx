import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Map from '../Map/Map.jsx';
import Home from '../Home/Home';
import Dashboard from '../Dashboard/Dashboard';
import RegisterComponent from '../RegisterComponent/RegisterComponent';
import LoginFormComponent from '../LoginComponent/LoginFormComponent';

import Details from '../Details/Details';

export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            updateUser: this.updateUser
        };
    }


    updateUser = (user) => {
        this.setState({ user: user });
        if (user) {
            user = typeof user === "string" ? user : JSON.stringify(user);
            window.localStorage.setItem('_user', user);
        } else {
            window.localStorage.removeItem('_user');
        }
    };



    componentDidMount = () => {
        this.setState({
            user: JSON.parse(window.localStorage.getItem('_user')) || null
        });
    };

    render() {
        console.log('app state', this.state);
        return (
            <Router>
                {/* anything before switch wil be shared among pages  */}
                <Switch>

                    <Route exact path="/">
                        <Home state={this.state} />
                    </Route>

                    <Route path="/map">
                        <Map state={this.state} />
                    </Route>

                    <Route path="/dashboard">
                        <Dashboard state={this.state} />
                    </Route>

                    <Route path="/landmarks/:landmark_id" component={Details} />

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