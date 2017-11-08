import React from 'react';

export default class CloseButton extends React.Component {
    render() {
        return (
            <div className="closeButton" onClick={this.props.onClick}>
                <i className="fa fa-close" aria-hidden="true"> </i>
            </div>
        );
    }
};
