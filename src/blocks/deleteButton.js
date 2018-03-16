import React from 'react';

export default class DeleteButton extends React.Component {
    render() {
        return (
            <div className="deleteButton" onClick={this.props.onClick}>
                <i className="fa fa-trash" aria-hidden="true"> </i>
            </div>
        );
    }
};
