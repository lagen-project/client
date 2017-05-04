import React from 'react';

import Step from './step';

export default class Scenario extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scenario: this.props.scenario
        };

        this.handleStepChange = this.handleStepChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.scenario) !== JSON.stringify(this.state.scenario)) {
            this.setState({ scenario: nextProps.scenario });
        }
    }

    handleStepChange(e) {
        let scenario = this.state.scenario;

        scenario.steps[e.id] = e.step;
        this.props.onChange({
            scenario,
            key: this.props.id
        });
    }

    render() {
        return (
            <div className={`scenario scenario--${this.state.scenario.type}`}>
                <h2>{this.state.scenario.name}</h2>
                {this.state.scenario.steps.map((step, id) => (
                    <Step
                        step={step}
                        key={id}
                        id={id}
                        onChange={this.handleStepChange}
                    />
                ))}
            </div>
        );
    }
};
