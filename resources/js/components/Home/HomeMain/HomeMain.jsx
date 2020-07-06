import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import ContactForm from './ContactForm'

export default class HomePageContent extends Component {
    render() {
        return (
            <main className="main">
                <section className="main__home">
                    <div className="main__home__intro">
                        <h1>WatchMan</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi, consequatur perferendis? Corrupti, aperiam. Cumque, nihil!</p>
                        <div className="main__home__buttons">
                            <Link to="/map">See the map</Link>
                        </div>
                    </div>
                </section>
                <section className="main__features">
                    <h2>Main Features</h2>
                    <div className="main__features__container">
                        <div className="main__features__column">
                            <div className="main__features__content" v>
                                <h4>Get notifications on your email/phone</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis esse voluptatem vero debitis quisquam animi!</p>
                            </div>
                            <div className="main__features__img">
                                <img src="/img/home/notification.svg" />
                            </div>
                        </div>
                        <div className="main__features__column">
                            <div className="main__features__img">
                                <img src="/img/home/marker-b:w.png" />
                            </div>
                            <div className="main__features__content">
                                <h4>Create new landmark</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, asperiores.</p>
                            </div>
                        </div>
                        <div className="main__features__column">
                            <div className="main__features__content" v>
                                <h4>Get notifications on your email/phone</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis esse voluptatem vero debitis quisquam animi!</p>
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
                    <h3>Let's write a little story about why we want our users to download our app.</h3>
                    <a href="#">Download App</a>
                </section>
            </main>
        )
    }
}
