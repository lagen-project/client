import React from 'react';

export default class PlusButton extends React.Component {
    render() {
        return (
            <div className="plusButton" onClick={this.props.onClick}>
                <i className="fa fa-plus" aria-hidden="true"> </i>
            </div>
        );
    }
};
