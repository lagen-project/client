import React from 'react';

export default class Notification extends React.Component {
    render() {
        return <div className={`notification notification--${this.props.type}`}>
            <div className="notification-close" onClick={this.props.onClose}>
                <i className="fa fa-times-circle" />
            </div>
            {this.props.message}
        </div>
    }
}
