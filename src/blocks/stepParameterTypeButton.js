import React from 'react';

export default class StepParameterTypeButton extends React.Component {
    render() {
        return (
            <div
                className={`stepParameterTypeButton${this.props.selected ? ' stepParameterTypeButton--selected' : ''}`}
                onClick={this.props.onClick}
            >
                <i className={`fa fa-${this.props.icon}`} aria-hidden="true"> </i>
            </div>
        );
    }
};
