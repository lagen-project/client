import React from 'react';

import Step from './step';

export default class Scenario extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scenario: this.props.scenario,
            mode: 'read'
        };

        this.switchToRead = this.switchToRead.bind(this);
        this.switchToWrite = this.switchToWrite.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.scenario) !== JSON.stringify(this.state.scenario)) {
            this.setState({ scenario: nextProps.scenario });
        }
    }

    switchToRead() {
        this.setState({ mode: 'read' });
    }

    switchToWrite() {
        this.setState({ mode: 'write' });
    }

    handleStepChange(e) {
        let scenario = this.state.scenario;

        scenario.steps[e.id] = e.step;
        this.props.onChange({
            scenario,
            key: this.props.id
        });
    }

    handleNameChange(e) {
        let scenario = this.state.scenario;

        scenario.name = e.target.value;
        this.props.onChange({
            scenario,
            key: this.props.id
        });
    }

    render() {
        return (
            <div className={`scenario scenario--${this.state.scenario.type}`}>
                <h2 className={`scenarioTitle scenarioTitle--${this.state.mode}Mode`} onClick={this.switchToWrite} onBlur={this.switchToRead}>
                    {this.state.mode === 'read' ? (
                        this.state.scenario.name
                    ) : (
                        <input
                            type="text"
                            className="scenario-titleInput"
                            value={this.state.scenario.name}
                            onChange={this.handleNameChange}
                            autoFocus={true}
                        />
                    )}
                </h2>
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
