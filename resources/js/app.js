import React from 'react';
import ReactDOM from 'react-dom';

import Map from './components/Map/Map.jsx';
import HomePage from './components/HomePage/HomePage';
import LandmarkDetails from './components/LandmarkDetails/LandmarkDetails';
import RegisterComponent from './components/RegisterComponent/RegisterComponent';
import LoginFormComponent from './components/LoginFormComponent';


import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <Router> 
    {/* anything before switch wil be shared among pages  */}
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/map" component={Map} />
            <Route path="/landmarks/:landmark_id" component={LandmarkDetails} />
            <Route path="/register" component={RegisterComponent} />
            <Route path="/login" component={LoginFormComponent} />
        </Switch>
    </Router>,
    document.getElementById('app'));
