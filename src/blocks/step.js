import React from 'react';

import StepParameter from './stepParameter';

export default class Step extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: this.props.step
        };

        this.handleParameterChange = this.handleParameterChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.step) !== JSON.stringify(this.state.step)) {
            this.setState({ step: nextProps.step });
        }
    }

    handleParameterChange(newValue) {
        let step = this.state.step;

        step.parameter.value = newValue;
        this.props.onChange({
            step,
            id: this.props.id
        });
    }

    render() {
        return (
            <div className="step">
                <div className="grid">
                    <div className="step-type">{this.state.step.type}</div>
                    <div className="step-sentence">{this.state.step.sentence}</div>
                </div>
                {this.state.step.parameter ? (
                    <StepParameter
                        parameter={this.state.step.parameter}
                        onChange={this.handleParameterChange}
                    />
                ): null}
            </div>
        );
    }
};
