import React from 'react';

export default class StepParameterString extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parameter: this.props.parameter,
            mode: 'read'
        };

        this.switchToRead = this.switchToRead.bind(this);
        this.switchToWrite = this.switchToWrite.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    switchToRead() {
        this.setState({ mode: 'read' });
    }

    switchToWrite() {
        this.setState({ mode: 'write' });
    }

    handleValueChange(e) {
        this.props.onChange(e.target.value);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.parameter) !== JSON.stringify(this.state.parameter)) {
            this.setState({ parameter: nextProps.parameter });
        }
    }

    render() {
        return (
            <div className="stepParameterString" onClick={this.switchToWrite} onBlur={this.switchToRead}>
                {this.state.mode === 'read' ? (
                    this.state.parameter.value.split('\n').map((str, id) => <p key={id}>{str}</p>)
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
