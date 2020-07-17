import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ContactForm from './ContactForm'
import LogoutComponent from '../../LoginComponent/LogoutComponent';

export default class HomeMain extends Component {
    render() {
        return (
            <main className="main">
                <section className="main__home">
                    <div className="main__home__intro">
                        <h1>WatchMan</h1>
                        <p>YOUR FIRST PLATFORM TO WATCH, PROTECT AND DISCUSS STATE OF HISTORICAL BUILDINGS. <br /> BECOME A WATCHMAN GUARDIAN OF YOUR CITY'S HERITAGE</p>

                        <div className="main__home__buttons">
                            <Link to="/map">See the map</Link>
                        </div>
                    </div>
                </section>
                <section className="main__features">
                    <h2>Main Features</h2>
                    <div className="main__features__container">
                        <div className="main__features__column">
                            <div className="main__features__content">
                                <h4>Track landmarks and receive updates about them</h4>
                                <p>Download our mobile app and always stay informed about the buildings in your area: restoration projects, crowdfunding, and of course any potentially illegal activity which might damage the landmark. </p>
                            </div>
                            <div className="main__features__img">
                                <img src="/img/home/houses-animate.svg" />
                            </div>
                        </div>
                        <div className="main__features__column">
                            <div className="main__features__img">
                                <img src="/img/home/map-animate.svg" />
                            </div>
                            <div className="main__features__content">
                                <h4>Add landmarks and events about them</h4>
                                <p>Let Watchman community know any news and activity around the landmark!</p>
                            </div>
                        </div>
                        <div className="main__features__column">
                            <div className="main__features__content">
                                <h4>Participate in conversation</h4>
                                <p>Watchman is an all-inclusive network. We encourage everyone who wants to support sustainable urban development, while being able to maintain architectural heritage of the city.</p>
                            </div>
                            <div className="main__features__img">
                                <img src="/img/home/notification.svg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="contact" className="main__contact">
                    <h2>Get In Touch</h2>
                    <ContactForm />
                </section>
                <section className="main__download">
                    <h3>Our app is free! Find it here:</h3>
                    <a href="#">Download App</a>
                </section>
            </main>
        )
    }
}
