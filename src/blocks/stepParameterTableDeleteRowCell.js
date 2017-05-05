import React from 'react';

export default class StepParameterTableDeleteRowCell extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onDeleteRow(this.props.row);
    }

    render() {
        return (
            <td onClick={this.handleClick} className="stepParameterTable-deleteRow">
                x
            </td>
        );
    }
};
