import React from 'react';

export default class FeatureDeleteButton extends React.Component {
    render() {
        return (
            <div className="featureDeleteButton" onClick={this.props.onClick}>
                <i className="fa fa-trash" aria-hidden="true"> </i>
            </div>
        );
    }
};
