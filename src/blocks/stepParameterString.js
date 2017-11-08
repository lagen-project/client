import React from 'react';

export default class StepParameterString extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parameter: this.props.parameter,
            mode: 'read'
        };
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.parameter) !== JSON.stringify(this.state.parameter)) {
            this.setState({ parameter: nextProps.parameter });
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

    handleValueChange = (e) => {
        this.props.onChange(e.target.value);
    };

    render() {
        return (
            <div className={`stepParameterString stepParameterString--${this.state.mode}Mode`} onClick={this.switchToWrite} onBlur={this.switchToRead}>
                {this.state.mode === 'read' || this.props.featureMode === 'read' ? (
                    this.state.parameter.value ?
                    this.state.parameter.value.split('\n').map((str, id) => <p key={id}>{str}</p>) :
                    <span className="stepParameterString-placeholder">-</span>
                ) : (
                    <textarea
                        value={this.state.parameter.value}
                        onChange={this.handleValueChange}
                        autoFocus={true}
                    />
                )}
            </div>
        );
    }
};
