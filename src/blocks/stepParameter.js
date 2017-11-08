import React from 'react';

import StepParameterString from './stepParameterString';
import StepParameterTable from './stepParameterTable';
import StepParameterTypeButton from './stepParameterTypeButton';

export default class StepParameter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parameter: this.props.parameter
        };
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.parameter) !== JSON.stringify(this.state.parameter)) {
            this.setState({ parameter: nextProps.parameter });
        }
    }

    handleChange = (newValue) => {
        this.props.onValueChange(newValue);
    };

    switchToString = () => {
        if (this.props.featureMode === 'write') {
            this.changeParameterType('string');
        }
    };

    switchToTable = () => {
        if (this.props.featureMode === 'write') {
            this.changeParameterType('table');
        }
    };

    removeParameter = () => {
        if (this.props.featureMode === 'write') {
            this.props.onRemove();
        }
    };

    changeParameterType = (newType) => {
        let parameter = this.state.parameter ? this.state.parameter : {
            type: '',
            value: null
        };

        parameter.type = newType;
        parameter.value = newType === 'string' ? '' : [['']];

        this.props.onChange(parameter);
    };

    render() {
        return (
            <div className="stepParameter">
                {this.props.featureMode === 'write' ? (
                    <div className="stepParameter-typeSelection">
                        {this.state.parameter ? (
                            <div>
                                <StepParameterTypeButton
                                    icon="ban"
                                    selected={false}
                                    onClick={this.removeParameter}
                                />
                                <StepParameterTypeButton
                                    icon="bars"
                                    selected={this.state.parameter && this.state.parameter.type === 'string'}
                                    onClick={this.switchToString}
                                />
                                <StepParameterTypeButton
                                    icon="table"
                                    selected={this.state.parameter && this.state.parameter.type === 'table'}
                                    onClick={this.switchToTable}
                                />
                            </div>
                        ) :
                        <StepParameterTypeButton
                            icon="plus"
                            selected={true}
                            onClick={this.switchToString}
                        />}
                    </div>
                ) : null}
                {this.state.parameter ? (
                    this.props.parameter.type === 'string' ? (
                        <StepParameterString
                            parameter={this.props.parameter}
                            onChange={this.handleChange}
                            featureMode={this.props.featureMode}
                        />
                    ) : (
                        <StepParameterTable
                            parameter={this.props.parameter}
                            onChange={this.handleChange}
                            featureMode={this.props.featureMode}
                        />
                    )
                ) : null}
            </div>
        );
    }
};
