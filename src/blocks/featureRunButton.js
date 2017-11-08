import React from 'react';

export default class FeatureRunButton extends React.Component {
    render() {
        return (
            <div
                className={`featureRunButton${this.props.animate ? ' featureRunButton--running' : ''}`}
                onClick={this.props.onClick}
            >
                <i className="fa fa-play" aria-hidden="true"> </i>
            </div>
        );
    }
};
