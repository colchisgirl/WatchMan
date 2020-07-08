import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { data } = this.props
        return (
            <div className='sidebar' >
                <div className='heading'>
                    <h1>Events</h1>
                    <Link
                        to={{
                            pathname: `/landmarks/${data.id}/createEvent`,
                            state: {
                                landmark_id: data.url
                            }
                        }}>
                        <button className="btn-new-landmark">New event</button>
                    </Link>
                </div>
                <div id='listings' className='listings'>
                    {data.events !== [] ? (
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
