import React from 'react';

export default class StepParameterTableDeleteRowCell extends React.Component {
    handleClick = () => {
        this.props.onDeleteRow(this.props.row);
    };

    render() {
        return (
            <td onClick={this.handleClick} className="stepParameterTable-deleteRow">
                <i className="fa fa-close" aria-hidden="true"> </i>
            </td>
        );
    }
};
