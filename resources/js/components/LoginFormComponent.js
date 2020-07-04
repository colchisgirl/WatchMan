import React from 'react';
import LoginForm from './LoginForm';
import Map from './Map/Map';


export default class OginFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logged_in: null,
            token: window.localStorage.getItem('_token') // get the initial value of the token from the browser's storage
        }
    }

    componentDidMount() {
        // change the state to reflect existence of a token
        // UPGRADE: we should check the value against another
        //          API endpoint to see if it is valid
        this.setState({
            logged_in: this.state.token !== null
        })
    }

    onLoginSuccess = (token) => {
 
        // store the token in the browser's storage
        window.localStorage.setItem('_token', token)
     
        // change the current state of this App to reflect
        // that we are logged-in
        this.setState({
            logged_in: true,
            token: token
        })
    }

    onFailedAuthentication = () => {

        // remove the token from the browser's storage
        window.localStorage.removeItem('_token');

        // change the current state of this App to reflect
        // that we don't have a good token (we are not logged-in)
        this.setState({
            logged_in: false,
            token: null
        })
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
                            <Map 
                                token={ this.state.token } 
                                onFailedAuthentication={ this.onFailedAuthentication }
                            />
                            :
                            <LoginForm onLoginSuccess={ this.onLoginSuccess } />
                        )
                }
                
            </>
        )
    }
}
