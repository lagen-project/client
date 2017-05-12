import React from 'react';

export default class StepParameterTableCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            mode: 'read'
        };

        this.switchToRead = this.switchToRead.bind(this);
        this.switchToWrite = this.switchToWrite.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value });
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

    handleValueChange(e) {
        this.setState({ value: e.target.value });
        this.props.onChange({
            row: this.props.row,
            column: this.props.column,
            value: e.target.value
        });
    }

    render() {
        return (
            <td onClick={this.switchToWrite} onBlur={this.switchToRead} className={`stepParameterTableCell stepParameterTableCell--${this.state.mode}Mode`}>
                {this.state.mode === 'read' || this.props.featureMode === 'read' ? (
                    this.state.value ? this.state.value : <span className="stepParameterTableCell-placeholder">-</span>
                ) : (
                    <input type="text" value={this.state.value} onChange={this.handleValueChange} autoFocus={true} />
                )}
            </td>
        );
    }
};
