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

        this.handleClose = this.handleClose.bind(this);
        this.handleParameterChange = this.handleParameterChange.bind(this);
        this.handleParameterValueChange = this.handleParameterValueChange.bind(this);
        this.handleRemoveParameter= this.handleRemoveParameter.bind(this);
        this.handleSentenceChange = this.handleSentenceChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.switchSentenceToRead = this.switchSentenceToRead.bind(this);
        this.switchSentenceToWrite = this.switchSentenceToWrite.bind(this);
        this.switchTypeToRead = this.switchTypeToRead.bind(this);
        this.switchTypeToWrite = this.switchTypeToWrite.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.step) !== JSON.stringify(this.state.step)) {
            this.setState({ step: nextProps.step });
        }
    }

    switchSentenceToRead() {
        this.setState({ sentenceMode: 'read' });
    }

    switchSentenceToWrite() {
        this.setState({ sentenceMode: 'write' });
    }

    switchTypeToRead() {
        this.setState({ typeMode: 'read' });
    }

    switchTypeToWrite() {
        this.setState({ typeMode: 'write' });
    }

    handleSentenceChange(e) {
        let step = this.state.step;

        step.sentence = e.target.value;
        this.props.onChange({
            step,
            id: this.props.id
        });
    }

    handleTypeChange(e) {
        let step = this.state.step;

        step.type = e.target.value;
        this.props.onChange({
            step,
            id: this.props.id
        });
    }

    handleParameterValueChange(newValue) {
        let step = this.state.step;

        step.parameter.value = newValue;
        this.props.onChange({
            step,
            id: this.props.id
        });
    }

    handleParameterChange(newParameter) {
        let step = this.state.step;

        step.parameter = newParameter;
        this.props.onChange({
            step,
            id: this.props.id
        });
    }

    handleRemoveParameter() {
        let step = this.state.step;

        delete step.parameter;

        this.props.onChange({
            step,
            id: this.props.id
        });
    }

    handleClose() {
        this.props.onClose(this.props.id);
    }

    render() {
        return (
            <div className="step">
                <CloseButton onClick={this.handleClose} />
                <div className="grid">
                    <div className={`step-type step-type--${this.state.typeMode}Mode`} onClick={this.switchTypeToWrite} onBlur={this.switchTypeToRead}>
                        {this.state.typeMode === 'read' ? (
                            this.state.step.type
                        ) : (
                            <select value={this.state.step.type} onChange={this.handleTypeChange} autoFocus={true}>
                                <option value='Given'>Given</option>
                                <option value='When'>When</option>
                                <option value='Then'>Then</option>
                                <option value='And'>And</option>
                                <option value='But'>But</option>
                            </select>
                        )}
                    </div>
                    <div className={`step-sentence step-sentence--${this.state.sentenceMode}Mode`} onClick={this.switchSentenceToWrite} onBlur={this.switchSentenceToRead}>
                        {this.state.sentenceMode === 'read' ? (
                            this.state.step.sentence
                        ) : (
                            <input
                                type="text"
                                value={this.state.step.sentence}
                                autoFocus={true}
                                onChange={this.handleSentenceChange}
                            />
                        )}
                    </div>
                </div>
                {this.state.step.parameter ? (
                    <StepParameter
                        parameter={this.state.step.parameter}
                        onChange={this.handleParameterChange}
                        onValueChange={this.handleParameterValueChange}
                        onRemove={this.handleRemoveParameter}
                    />
                ): null}
            </div>
        );
    }
};
