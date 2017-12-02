import React from 'react';

export default class ResultsButton extends React.Component {
    render() {
        return (
            <div
                className={`resultsButton${this.props.active ? ' resultsButton--active' : ''}`}
                onClick={this.props.onClick}
            >
                <i className="fa fa-bar-chart" aria-hidden="true"> </i>
            </div>
        );
    }
};
