import React from 'react';

export default class ScenarioTypeButton extends React.Component {
    render() {
        return (
            <div className="scenarioTypeButton" onClick={this.props.onClick}>
                <i className="fa fa-film" aria-hidden="true"> </i>
            </div>
        );
    }
};
