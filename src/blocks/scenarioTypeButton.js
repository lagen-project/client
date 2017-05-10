import React from 'react';

export default class ScenarioTypeButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <div className="scenarioTypeButton" onClick={this.handleClick}>
                <i className="fa fa-film" aria-hidden="true"> </i>
            </div>
        );
    }
};
