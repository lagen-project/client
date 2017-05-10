import React from 'react';

export default class StepParameterTypeButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <div className={`stepParameterTypeButton${this.props.selected ? ' stepParameterTypeButton--selected' : ''}`} onClick={this.handleClick}>
                <i className={`fa fa-${this.props.icon}`} aria-hidden="true"> </i>
            </div>
        );
    }
};
