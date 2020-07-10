import React from 'react'

import { Route, Link, Switch } from 'react-router-dom'
import Logo from '../../Logo'
import CreateLandmark from '../CreateLandmark/CreateLandmark'


export default class Sidebar extends React.Component {

    render() {

        return (
            <div className="sidebar">
                <nav className="sidebar__nav" >
                    <Link to="/">Home</Link>
                    <Logo />
                    <Link to="/dashboard">Dashboard</Link>
                </nav>

                <div className='heading'>
                </div>
                <Switch>
                    <Route exact path="/map">
                        <h1>Landmarks</h1>
                        <div id='listings' className='listings'>
                            {this.props.data.map((landmark, i) => (
                                <div key={i} className="item">
                                    <h3 className="item__title">{landmark.title}</h3>
                                    <p className="item__address">{landmark.house_number} {landmark.street} {landmark.city}</p>
                                </div>
                            ))}
                        </div>
                    </Route>
                    <Route path="/map/createLandmark">
                        <CreateLandmark state={this.props.state} marker={this.props.marker} />
                    </Route>
                </Switch>
            </div>
        );
    }

}
