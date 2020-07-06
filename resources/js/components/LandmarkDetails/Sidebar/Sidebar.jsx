import React from 'react'
import { Link } from 'react-router-dom'

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
                    <button className="btn-new-landmark">New event</button>
                </div>
                <div id='listings' className='listings'>
                    {data.events !== [] ? (
                        data.events?.map((event) => (
                            <Link to={`/landmarks/${data.id}/${event.id}`}>
                                <div className="item">
                                    <h3 className="item__title">{event.title}</h3>
                                </div>
                            </Link>
                        ))
                    ) : (
                            <p>No events</p>
                        )}
                </div>
            </div >
        );
    }

}
