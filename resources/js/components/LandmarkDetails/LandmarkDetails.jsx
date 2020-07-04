import React, { Component } from 'react'


export default class LandmarkDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []

        }
    }

    componentDidMount = () => {

        fetch('/api/landmarks', {
            headers: {
                'Accept': 'application/json', // we expect JSON as response
                'Content-Type': 'application/json', // if we are sending something in the body, it is JSON
                'Authorization': 'Bearer ' + this.props.token
            }
        })
            .then(response => {
                // if the response code is 200 (OK)
                if (response.status === 200) {
                    // parse it as JSON and do the typical stuff
                    response.json()
                        .then(data => {
                            // set the data into this component's state
                            this.setState({
                                data: data
                            })
                        })
                } else {
                    // otherwise react on the error code
                    if (response.status === 401) {
                        // signal to the App that authentication failed
                        this.props.onFailedAuthentication()
                    }
                }
            })
    }
    render() {
        return (
            <div className="details__container">
                details
            </div>
        )
    }
}
