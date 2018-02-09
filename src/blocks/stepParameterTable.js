import React from 'react';

import StepParameterTableCell from './stepParameterTableCell';
import StepParameterTableDeleteColumnCell from './stepParameterTableDeleteColumnCell';
import StepParameterTableDeleteRowCell from './stepParameterTableDeleteRowCell';

export default class StepParameterTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parameter: this.props.parameter,
            writingCell: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.parameter) !== JSON.stringify(this.state.parameter)) {
            this.setState({ parameter: nextProps.parameter });
        }
    }

    handleCellChange = (e) => {
        let parameterValue = this.state.parameter.value;

        parameterValue[e.row][e.column] = e.value;
        this.props.onChange(parameterValue);
    };

    handleColumnAdd = () => {
        let parameterValue = this.state.parameter.value;

        parameterValue = parameterValue.map(row => {
            row.push('');

            return row;
        });

        this.props.onChange(parameterValue);
    };

    handleColumnDelete = (columnId) => {
        let parameterValue = this.state.parameter.value;

        parameterValue = parameterValue.map(row => {
            row.splice(columnId, 1);

            return row;
        });

        this.props.onChange(parameterValue);
    };

    handleRowAdd = () => {
        let parameterValue = this.state.parameter.value;
        let newRow = [];

        for (let i = 0 ; i < parameterValue[0].length ; i++) {
            newRow.push('');
        }
        parameterValue.push(newRow);

        this.props.onChange(parameterValue);
    };

    handleRowDelete = (rowId) => {
        let parameterValue = this.state.parameter.value;

        parameterValue.splice(rowId, 1);

        this.props.onChange(parameterValue);
    };

    handleCellSwitchToWrite = (row, column) => {
        this.setState({
            writingCell: {
                row,
                column
            }
        });
    };

    handleCellSwitchToRead = () => {
        this.setState({ writingCell: null });
    };

    handleCellTabPressed = (row, column) => {
        if (column < this.state.parameter.value[row].length - 1) {
            this.setState({
                writingCell: {
                    row,
                    column: (column + 1)
                }
            })
        } else if (row < this.state.parameter.value.length - 1) {
            this.setState({
                writingCell: {
                    row: row + 1,
                    column: 0
                }
            })
        } else {
            this.setState({ writingCell: null });
        }
    };

    render() {
        const nbRows = this.state.parameter.value.length;
        const nbColumns = this.state.parameter.value[0].length;

        return (
            <div className="stepParameterTable">
                <table>
                    <tbody>
                        {this.props.featureMode === 'write' ? (
                            <tr className="stepParameterTable-deleteColumn">
                                <td className="stepParameterTable-deleteRow"> </td>
                                {this.state.parameter.value[0].map((column, columnId) => (
                                    <StepParameterTableDeleteColumnCell
                                        column={columnId}
                                        onDeleteColumn={this.handleColumnDelete}
                                        key={columnId}
                                    />
                                ))}
                                <td> </td>
                            </tr>
                        ) : null}
                        {this.state.parameter.value.map((row, rowId) => {
                            return (
                                <tr key={rowId}>
                                    {this.props.featureMode === 'write' ? (
                                        <StepParameterTableDeleteRowCell
                                            row={rowId}
                                            onDeleteRow={this.handleRowDelete}
                                        />
                                    ) : null}
                                    {row.map((cell, columnId) => (
                                        <StepParameterTableCell
                                            key={columnId}
                                            value={cell}
                                            row={rowId}
                                            column={columnId}
                                            mode={
                                                this.state.writingCell &&
                                                this.state.writingCell.row === rowId &&
                                                this.state.writingCell.column === columnId ?
                                                    'write' :
                                                    'read'
                                            }
                                            onChange={this.handleCellChange}
                                            onDeleteColumn={this.handleColumnDelete}
                                            onDeleteRow={this.handleRowDelete}
                                            onSwitchToRead={this.handleCellSwitchToRead}
                                            onSwitchToWrite={this.handleCellSwitchToWrite}
                                            onTabPressed={this.handleCellTabPressed}
                                            featureMode={this.props.featureMode}
                                        />
                                    ))}
                                    {rowId === 0 && this.props.featureMode === 'write' ? (
                                        <td
                                            rowSpan={nbRows}
                                            className="stepParameterTable-placeholderColumn"
                                            onClick={this.handleColumnAdd}
                                        >
                                            <i className="fa fa-arrow-right" aria-hidden="true"> </i>
                                        </td>
                                    ) : null}
                                </tr>
                            )
                        })}
                        {this.props.featureMode === 'write' ? (
                            <tr className="stepParameterTable-placeholderRow">
                                <td> </td>
                                <td colSpan={nbColumns} onClick={this.handleRowAdd}>
                                    <i className="fa fa-arrow-down" aria-hidden="true"> </i>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        );
    }
};
