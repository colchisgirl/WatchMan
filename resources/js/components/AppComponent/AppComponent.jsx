import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Map from '../Map/Map.jsx';
import Home from '../Home/Home';
import RegisterComponent from '../RegisterComponent/RegisterComponent';
import LoginFormComponent from '../LoginComponent/LoginFormComponent';

import LandmarkDetails from '../LandmarkDetails/LandmarkDetails';

export default class AppComponent extends React.Component {

    updateUser = (user) => {
        this.setState({ user: user });
        if (user) {
            user = typeof user === 'string' ? user : JSON.stringify(user);
            window.localStorage.setItem('_user', user);
        } else {
            window.localStorage.removeItem('_user');
        }
    };

    state = {
        user: null,
        updateUser: this.updateUser
    };

    componentDidMount = () => {
        this.setState({
            user: window.localStorage.getItem('_user') || null
        });
    };

    render() {
        return (
            <Router> 
            {/* anything before switch wil be shared among pages  */}
                <Switch>
                    <Route exact path="/">
                        <Home state={this.state} />
                    </Route>
                    <Route path="/map" component={Map}></Route>
                    <Route path="/landmarks/:landmark_id" component={LandmarkDetails} />
                    
                    <Route path="/register">
                        <RegisterComponent state={this.state}/>
                    </Route>

                    <Route path="/login">
                        <LoginFormComponent state={this.state} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}