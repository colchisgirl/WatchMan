import React, { Component } from 'react'

export default class ContactForm extends Component {
    render() {
        return (
            <div className="main__contact__form">
                <form action="">
                    <textarea name="" id="" cols="30" rows="10" placeholder="Message"></textarea>
                    <br></br>
                    <div className="main__contact__inputs">
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="Full Name" />
                        <input type="submit" />
                    </div>
                </form>
            </div>
        )
    }
}
