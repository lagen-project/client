import React from 'react';

import ConfirmButtonOk from './confirmButtonOk';
import ConfirmButtonCancel from './confirmButtonCancel';

export default class Confirm extends React.Component {
    render() {
        return (
            <div className="confirm">
                <div className="confirm-center">
                    {this.props.question}
                    <div className="confirm-actions">
                        <ConfirmButtonOk onClick={this.props.onOk} />
                        <div className="confirm-blank" />
                        <ConfirmButtonCancel onClick={this.props.onCancel} />
                    </div>
                </div>
            </div>
        );
    }
};
