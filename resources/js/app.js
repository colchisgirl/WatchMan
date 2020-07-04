import React from 'react';
import ReactDOM from 'react-dom';

import Map from './components/Map/Map.jsx';
import Home from './components/Home/Home'
import LandmarkDetails from './components/LandmarkDetails/LandmarkDetails'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/map" component={Map} />
            <Route path="/landmarks/:landmark_id" component={LandmarkDetails} />
        </Switch>
    </Router>,
    document.getElementById('app'));
