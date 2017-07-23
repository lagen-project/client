import React from 'react';

import CloseButton from './closeButton';
import PlusButton from './plusButton';
import ScenarioTypeButton from './scenarioTypeButton';
import Step from './step';

export default class Scenario extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scenario: this.props.scenario,
            mode: this.props.scenario.name ? 'read' : 'write'
        };

        this.switchToRead = this.switchToRead.bind(this);
        this.switchToWrite = this.switchToWrite.bind(this);
        this.switchType = this.switchType.bind(this);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStepAdd = this.handleStepAdd.bind(this);
        this.handleStepClose = this.handleStepClose.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.scenario) !== JSON.stringify(this.state.scenario)) {
            this.setState({ scenario: nextProps.scenario });
        }
    }

    switchToRead() {
        if (this.props.featureMode === 'write') {
            this.setState({mode: 'read'});
        }
    }

    switchToWrite() {
        if (this.props.featureMode === 'write') {
            this.setState({mode: 'write'});
        }
    }

    switchType() {
        if (this.props.featureMode === 'write') {
            let scenario = this.state.scenario;

            scenario.type = scenario.type === 'regular' ? 'background' : 'regular';

            this.props.onChange({
                scenario,
                key: this.props.id
            });
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

    handleNameChange(e) {
        let scenario = this.state.scenario;

        scenario.name = e.target.value;
        this.props.onChange({
            scenario,
            key: this.props.id
        });
    }

    handleStepAdd() {
        let scenario = this.state.scenario;

        scenario.steps.push({
            type: 'Given',
            sentence: ''
        });
        this.props.onChange({
            scenario,
            key: this.props.id
        });
    }

    handleStepClose(stepId) {
        let scenario = this.state.scenario;

        scenario.steps.splice(stepId, 1);
        this.props.onChange({
            scenario,
            key: this.props.id
        });
    }

    handleClose() {
        this.props.onClose(this.props.id);
    }

    render() {
        return (
            <div className={`scenario scenario--${this.state.scenario.type}`}>
                {this.props.backgroundable === true && this.props.featureMode === 'write' ? (
                    <ScenarioTypeButton onClick={this.switchType} />
                ) : null}
                {this.props.featureMode === 'write' ? (
                    <CloseButton onClick={this.handleClose} />
                ) : null}
                {this.state.scenario.type === 'regular' ? (
                    <h2 className={`scenarioTitle scenarioTitle--${this.state.mode}Mode`} onClick={this.switchToWrite} onBlur={this.switchToRead}>
                        {this.state.mode === 'read' || this.props.featureMode === 'read' ? (
                            this.state.scenario.name ? this.state.scenario.name : (
                                <i>New scenario</i>
                            )
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
                ) : null}
                {this.state.scenario.steps.map((step, id) => (
                    <Step
                        step={step}
                        key={id}
                        id={id}
                        onChange={this.handleStepChange}
                        onClose={this.handleStepClose}
                        featureMode={this.props.featureMode}
                        result={this.props.result ? this.props.result[id] : null}
                    />
                ))}
                {this.props.featureMode === 'write' ? (
                    <PlusButton onClick={this.handleStepAdd} />
                ) : null}
            </div>
        );
    }
};
