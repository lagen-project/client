import React from 'react';

import CloseButton from './closeButton';
import Examples from './examples';
import PlusButton from './plusButton';
import ScenarioTypeButton from './scenarioTypeButton';
import Step from './step';

export default class Scenario extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scenario: this.props.scenario,
            mode: this.props.scenario.name ? 'read' : 'write',
            draggingStep: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.scenario) !== JSON.stringify(this.state.scenario)) {
            this.setState({ scenario: nextProps.scenario });
        }
    }

    switchToRead = () => {
        if (this.props.featureMode === 'write') {
            this.setState({mode: 'read'});
        }
    };

    switchToWrite = () => {
        if (this.props.featureMode === 'write') {
            this.setState({mode: 'write'});
        }
    };

    switchType = () => {
        if (this.props.featureMode === 'write') {
            let scenario = this.state.scenario;

            scenario.type = scenario.type === 'regular' ? 'background' : 'regular';

            this.props.onChange({
                scenario,
                key: this.props.id
            });
        }
    };

    handleDragStart = () => {
        this.props.onDragStart(this.props.id);
    };

    handleDragOver = () => {
        this.props.onDragOver(this.props.id);
    };

    handleStepChange = (e) => {
        let scenario = this.state.scenario;

        scenario.steps[e.id] = e.step;
        this.props.onChange({
            scenario,
            key: this.props.id
        });
    };

    handleStepDragStart = (scenarioId, stepId) => {
        this.setState({
            draggingStep: {
                scenarioId: scenarioId,
                stepId: stepId
            }
        });
    };

    handleStepDragOver = (scenarioId, stepId) => {
        if (this.state.draggingStep && this.state.draggingStep.scenarioId === this.props.id) {
            let scenario = this.state.scenario;
            const step = this.state.scenario.steps[this.state.draggingStep.stepId];

            this.state.scenario.steps.splice(this.state.draggingStep.stepId, 1);
            this.state.scenario.steps.splice(stepId, 0, step);

            this.setState({
                draggingStep: {
                    scenarioId: scenarioId,
                    stepId: stepId
                }
            });
            this.props.onChange({
                scenario,
                key: this.props.id
            });
        }
    };

    handleStepDragEnd = (scenarioId) => {
        if (scenarioId === this.props.id) {
            this.setState({ draggingStep: null });
        }
    };

    handleNameChange = (e) => {
        let scenario = this.state.scenario;

        scenario.name = e.target.value;
        this.props.onChange({
            scenario,
            key: this.props.id
        });
    };

    handleStepAdd = () => {
        let scenario = this.state.scenario;

        scenario.steps.push({
            type: 'Given',
            sentence: ''
        });
        this.props.onChange({
            scenario,
            key: this.props.id
        });
    };

    handleStepClose = (stepId) => {
        let scenario = this.state.scenario;

        scenario.steps.splice(stepId, 1);
        this.props.onChange({
            scenario,
            key: this.props.id
        });
    };

    handleExamplesChange = (examples) => {
        let scenario = this.state.scenario;

        scenario.examples = examples;

        this.setState({ scenario });
    };

    handleClose = () => {
        this.props.onClose(this.props.id);
    };

    render() {
        return (
            <div
                className={`scenario scenario--${this.state.scenario.type} ${this.props.dragging ? 'scenario--dragging' : ''}`}
                draggable={this.state.scenario.type !== 'background'}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnd={this.props.onDragEnd}
            >
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
                        scenarioId={this.props.id}
                        onChange={this.handleStepChange}
                        onClose={this.handleStepClose}
                        featureMode={this.props.featureMode}
                        result={this.props.result && this.state.scenario.examples.length === 0 ? this.props.result[id] : null}
                        onDragStart={this.handleStepDragStart}
                        onDragOver={this.handleStepDragOver}
                        onDragEnd={this.handleStepDragEnd}
                        dragging={
                            this.state.draggingStep &&
                            this.state.draggingStep.scenarioId === this.props.id &&
                            this.state.draggingStep.stepId === id
                        }
                    />
                ))}
                {this.props.featureMode === 'write' ? (
                    <PlusButton onClick={this.handleStepAdd} />
                ) : null}
                <Examples
                    steps={this.state.scenario.steps}
                    examples={this.state.scenario.examples}
                    featureMode={this.props.featureMode}
                    onChange={this.handleExamplesChange}
                    result={this.props.result ? this.props.result : null}
                />
            </div>
        );
    }
};
