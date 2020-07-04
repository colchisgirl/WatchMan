import React, { Component } from 'react'
import Header from './Header/Header'
import HomeMain from './HomeMain/HomeMain'
import Footer from './Footer/Footer'

import './index.scss'

export default class Home extends Component {
    render() {
        return (
            <div className="home__container" >
                <Header />

                <HomeMain />

                <Footer />
            </div>
        )
    }
}
