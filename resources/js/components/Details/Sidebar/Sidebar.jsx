import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { data } = this.props
        if (data === null)
            return null
        return (
            <div className='sidebar' >
                <div className='heading'>
                    <h1>Events</h1>
                    {
                        this.props.state.user ? (
                            <Link
                                to={{
                                    pathname: `/landmarks/${data.id}/createEvent`,
                                    state: {
                                        landmark_id: data.url
                                    }
                                }}>
                                <button className="btn-new-landmark"> + Add new event</button>
                            </Link>
                        ) : (
                                <p className="login__required__text">If you want to add new event, you have to <Link to="/login"><span className="login__required">login</span></Link>.</p>
                            )
                    }
                </div>
                <div id='listings' className='listings'>
                    {data.events.length > 0 ? (
                        data.events?.map((event, i) => (

                            <NavLink to={`/landmarks/${data.id}/${event.id}`} activeClassName="activeLink" key={i}>
                                <div className="item">
                                    <h3 className="item__title">{event.title}</h3>
                                </div>
                            </NavLink>
                        ))
                    ) : (
                            <p>No events</p>
                        )}
                </div>
            </div >
        );
    }

}
