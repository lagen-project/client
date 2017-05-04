import React from 'react';

import StepParameterString from './stepParameterString';
import StepParameterTable from './stepParameterTable';

export default class StepParameter extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(newValue) {
        this.props.onChange(newValue);
    }

    render() {
        return this.props.parameter.type === 'string' ? (
            <StepParameterString parameter={this.props.parameter} onChange={this.handleChange} />
        ) : (
            <StepParameterTable parameter={this.props.parameter} onChange={this.handleChange} />
        );
    }
};
