import React, { Component } from 'react'
import LoginButtonComponent from '../LoginButtonComponent';

export default class HomePage extends Component {
    render() {
        return (
            <div className='homepage__container'>
                <LoginButtonComponent />
            </div>
        )
    }
}
