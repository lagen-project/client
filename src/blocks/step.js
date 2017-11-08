import React from 'react';

import CloseButton from './closeButton';
import StepParameter from './stepParameter';

export default class Step extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: this.props.step,
            sentenceMode: this.props.step.sentence !== '' ? 'read' : 'write',
            typeMode: 'read'
        };
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.step) !== JSON.stringify(this.state.step)) {
            this.setState({ step: nextProps.step });
        }
    }

    switchSentenceToRead = () => {
        if (this.props.featureMode === 'write') {
            this.setState({ sentenceMode: 'read' });
        }
    };

    switchSentenceToWrite = () => {
        if (this.props.featureMode === 'write') {
            this.setState({sentenceMode: 'write'});
        }
    };

    handleSentenceChange = (e) => {
        let step = this.state.step;

        step.sentence = e.target.value;
        this.props.onChange({
            step,
            id: this.props.id
        });
    };

    handleTypeChange = (e) => {
        let step = this.state.step;

        step.type = e.target.value;
        this.props.onChange({
            step,
            id: this.props.id
        });
    };

    handleParameterValueChange = (newValue) => {
        let step = this.state.step;

        step.parameter.value = newValue;
        this.props.onChange({
            step,
            id: this.props.id
        });
    };

    handleParameterChange = (newParameter) => {
        let step = this.state.step;

        step.parameter = newParameter;
        this.props.onChange({
            step,
            id: this.props.id
        });
    };

    handleRemoveParameter = () => {
        let step = this.state.step;

        delete step.parameter;

        this.props.onChange({
            step,
            id: this.props.id
        });
    };

    handleClose = () => {
        this.props.onClose(this.props.id);
    };

    resolveStepClass = () => {
        if (!this.props.result) {
            return '';
        }

        if (this.props.result.success) {
            return 'step--success';
        }

        switch (this.props.result.reason) {
            case 'U':
                return 'step--undefined';
            case '-':
                return 'step--skipped';
            default:
                return 'step--failure';
        }
    };

    render() {
        return (
            <div className={`step ${this.resolveStepClass()}`}>
                {this.props.featureMode === 'write' ? (
                    <CloseButton onClick={this.handleClose} />
                ) : null}
                <div className="grid">
                    <div
                        className={`step-type step-type--${this.state.typeMode}Mode`}
                    >
                        {this.props.featureMode === 'read' ? (
                            this.state.step.type
                        ) : (
                            <select value={this.state.step.type} onChange={this.handleTypeChange}>
                                <option value='Given'>Given</option>
                                <option value='When'>When</option>
                                <option value='Then'>Then</option>
                                <option value='And'>And</option>
                                <option value='But'>But</option>
                            </select>
                        )}
                    </div>
                    <div className={`step-sentence step-sentence--${this.state.sentenceMode}Mode`} onClick={this.switchSentenceToWrite} onBlur={this.switchSentenceToRead}>
                        {this.state.sentenceMode === 'read' || this.props.featureMode === 'read' ? (
                            this.state.step.sentence
                        ) : (
                            <input
                                type="text"
                                value={this.state.step.sentence}
                                autoFocus={true}
                                onChange={this.handleSentenceChange}
                                list="availableSentences"
                            />
                        )}
                    </div>
                </div>
                {this.props.featureMode === 'write' || this.state.step.parameter ? (
                    <StepParameter
                        parameter={this.state.step.parameter}
                        onChange={this.handleParameterChange}
                        onValueChange={this.handleParameterValueChange}
                        onRemove={this.handleRemoveParameter}
                        featureMode={this.props.featureMode}
                    />
                ) : null}
            </div>
        );
    }
};
