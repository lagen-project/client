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
        this.handleDeleteColumn = this.handleDeleteColumn.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value });
        }
    }

    switchToRead() {
        this.setState({ mode: 'read' });
    }

    switchToWrite() {
        this.setState({ mode: 'write' });
    }

    handleDeleteColumn(e) {
        e.stopPropagation();
        this.props.onDeleteColumn(this.props.column);
    }

    handleDeleteRow(e) {
        e.stopPropagation();
        this.props.onDeleteRow(this.props.row);
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
            <td onClick={this.switchToWrite} onBlur={this.switchToRead} className="stepParameterTableCell">
                {this.props.row === 0 ? (
                    <div className="stepParameterTableCell-deleteColumn" onClick={this.handleDeleteColumn}>X</div>
                ) : null}

                {this.props.column === 0 ? (
                    <div className="stepParameterTableCell-deleteRow" onClick={this.handleDeleteRow}>X</div>
                ) : null}

                {this.state.mode === 'read' ? (
                    this.state.value ? this.state.value : <span className="stepParameterTableCell-placeholder">-</span>
                ) : (
                    <input type="text" value={this.state.value} onChange={this.handleValueChange} autoFocus={true} />
                )}
            </td>
        );
    }
};
