import React from 'react';

export default class ConfirmButtonCancel extends React.Component {
    render() {
        return (
            <div className="confirmButtonCancel" onClick={this.props.onClick}>
                Cancel
            </div>
        );
    }
};
