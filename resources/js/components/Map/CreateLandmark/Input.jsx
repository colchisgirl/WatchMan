import React, { Component } from 'react'

import TextField from '@material-ui/core/TextField';

export default class Input extends Component {
    render() {
        return (
            <TextField id="title_input"
                label="Landmark Title"
                value={this.props.title}
                onChange={(e) => { this.setState({ (this.props.value): e.target.value }) }
}
variant = "outlined" />
        )
    }
}
