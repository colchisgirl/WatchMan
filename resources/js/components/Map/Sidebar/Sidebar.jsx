import React from 'react'

import { Route, Link, Switch } from 'react-router-dom'
import Logo from '../../Logo'
import CreateLandmark from '../CreateLandmark/CreateLandmark'
import NavItem from '../../Home/Header/NavItem'
import Skeleton from 'react-loading-skeleton';


export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            landmarks: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            landmarks: this.props.data
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            landmarks: nextProps.data
        });
    }

    handleChange(e) {
        let currentList = [];
        let newList = [];

        if (e.target.value !== "") {

            currentList = this.props.data;

            newList = currentList.filter(landmark => {

                const lc = Object.keys(landmark).map((key, index) => {
                    const value = String(landmark[key]).toLowerCase()
                    const filter = e.target.value.toLowerCase()
                    if (value.includes(filter) === true) {
                        return true
                    }
                })
            });
        } else {

            newList = this.props.data;
        }
        this.setState({
            landmarks: newList
        });
    }

    render() {
        const { landmarks } = this.state

        return (
            <div className="sidebar">
                <nav className="sidebar__nav" >
                    <NavItem title="Home" path="/" />
                    <Logo />
                    {this.props.state.user ?
                        <NavItem title="Profile" path="/profile" />
                        :
                        <NavItem title="Login" path="/login" />
                    }

                </nav>

                <div className='heading'>
                </div>
                <Switch>
                    <Route exact path="/map">
                        <h1>Landmarks</h1>
                        <div id='listings' className='listings'>
                            {landmarks.map((landmark, i) => (
                                <div key={i} className="item">
                                    <button name={landmark.id}
                                        className="button__showLandmark"
                                        onClick={this.props.action}>
                                        {landmark.title}
                                    </button>
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
