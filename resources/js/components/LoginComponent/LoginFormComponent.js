import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';


export default class LoginFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logged_in: null,
            user: null
        }
    }

    componentDidMount() {
        // UPGRADE: we should check the value against another
        //          API endpoint to see if it is valid
        this.setState({
            logged_in: this.state.user !== null
        });
    }

    onLoginSuccess = (data) => {
     
        // change the current state of this App to reflect
        // that we are logged-in
        this.setState({
            logged_in: true,
            user: data.user
        });
        this.props.state.updateUser(data.user);
    }

    onFailedAuthentication = () => {

        // change the current state of this App to reflect
        // that we are not logged-in
        this.setState({
            logged_in: false,
            user: null
        });
        this.props.state.updateUser(null);
    }

    render() {

        // let content = <div>Loading...</div>;

        // if (this.state.logged_in === true) {
        //     content = <PeopleList />
        // } else if (this.state.logged_in === false) {
        //     content = <h1>Login form</h1>
        // }

        return (
            <>
                <h1>Watchman</h1>

                {
                    this.state.logged_in === null 
                        ?
                        <div>Aquiring login status...</div>
                        :
                        (
                            this.state.logged_in 
                            ?
                            <Redirect to="/map" />
                            :
                            <LoginForm onLoginSuccess={ this.onLoginSuccess } />
                        )
                }
                
            </>
        )
    }
}
