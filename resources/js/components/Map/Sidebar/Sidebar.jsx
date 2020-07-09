import React from 'react'

export default class Sidebar extends React.Component {

    render() {
        return (
            <div className='sidebar'>
                <div className='heading'>
                    <h1>Landmarks</h1>
                    <button className="btn-new-landmark">New landmark</button>
                </div>
                <div id='listings' className='listings'>
                    {this.props.data.map((landmark, i) => (
                        <div key={i} className="item">
                            <h3 className="item__title">{landmark.title}</h3>
                            <p className="item__address">{landmark.house_number} {landmark.street} {landmark.city}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

}
