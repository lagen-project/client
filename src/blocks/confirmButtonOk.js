import React from 'react';

export default class ConfirmButtonOk extends React.Component {
    render() {
        return (
            <div className="confirmButtonOk" onClick={this.props.onClick}>
                OK
            </div>
        );
    }
};
