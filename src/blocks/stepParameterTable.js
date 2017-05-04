import React from 'react';

import StepParameterTableCell from './stepParameterTableCell';

export default class StepParameterTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parameter: this.props.parameter
        };

        this.handleCellChange = this.handleCellChange.bind(this);
        this.handleColumnAdd = this.handleColumnAdd.bind(this);
        this.handleRowAdd = this.handleRowAdd.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.parameter) !== JSON.stringify(this.state.parameter)) {
            this.setState({ parameter: nextProps.parameter });
        }
    }

    handleCellChange(e) {
        let parameterValue = this.state.parameter.value;

        parameterValue[e.row][e.column] = e.value;
        this.props.onChange(parameterValue);
    }

    handleColumnAdd() {
        let parameterValue = this.state.parameter.value;

        parameterValue = parameterValue.map(row => {
            row.push('');

            return row;
        });

        this.props.onChange(parameterValue);
    }

    handleRowAdd() {
        let parameterValue = this.state.parameter.value;
        let newRow = [];

        for (let i = 0 ; i < parameterValue[0].length ; i++) {
            newRow.push('');
        }
        parameterValue.push(newRow);

        this.props.onChange(parameterValue);
    }

    render() {
        const nbRows = this.state.parameter.value.length;
        const nbColumns = this.state.parameter.value[0].length;

        return (
            <div className="stepParameterTable">
                <table>
                    <tbody>
                        {this.state.parameter.value.map((row, rowId) => {
                            return (
                                <tr key={rowId}>
                                    {row.map((cell, columnId) => (
                                        <StepParameterTableCell
                                            key={columnId}
                                            value={cell}
                                            row={rowId}
                                            column={columnId}
                                            onChange={this.handleCellChange}
                                        />
                                    ))}
                                    {rowId === 0 ? (
                                        <td
                                            rowSpan={nbRows}
                                            className="stepParameterTable-placeholderColumn"
                                            onClick={this.handleColumnAdd}
                                        > > </td>
                                    ) : null}
                                </tr>
                            )
                        })}
                        <tr className="stepParameterTable-placeholderRow">
                            <td colSpan={nbColumns} onClick={this.handleRowAdd}>v</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
};
