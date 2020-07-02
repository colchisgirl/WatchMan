import React from 'react';
import ReactDOM from 'react-dom';

import Map from './components/Map/Map.jsx';
import HomePage from './components/HomePage/HomePage'
import LandmarkDetails from './components/LandmarkDetails/LandmarkDetails'

import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/map" component={Map} />
            <Route path="/landmarks/:landmark_id" component={LandmarkDetails} />
        </Switch>
    </Router>,
    document.getElementById('app'));
