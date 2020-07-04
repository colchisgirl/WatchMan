import React from 'react'

export default class Sidebar extends React.Component {
    render() {
        return (
            <div className='sidebar' >
                <div className='heading'>
                    <h1>Events</h1>
                    <button className="btn-new-landmark">New event</button>
                </div>
                <div id='listings' className='listings'>
                    {this.props.data.map((landmark) => (
                        <div className="item">
                            <h3 className="item__title">{landmark.title}</h3>
                            <p className="item__address">{landmark.housenumber} {landmark.street} {landmark.city}</p>
                        </div>
                    ))}
                </div>
            </div >
        );
    }

}
