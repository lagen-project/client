import React from 'react';

export default class FeatureRunButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <div
                className={`featureRunButton${this.props.animate ? ' featureRunButton--running' : ''}`}
                onClick={this.handleClick}
            >
                <i className="fa fa-play" aria-hidden="true"> </i>
            </div>
        );
    }
};
