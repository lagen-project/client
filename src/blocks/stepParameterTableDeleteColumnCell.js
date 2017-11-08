import React from 'react';

export default class StepParameterTableDeleteColumnCell extends React.Component {
    handleClick = () => {
        this.props.onDeleteColumn(this.props.column);
    };

    render() {
        return (
            <td onClick={this.handleClick}>
                <i className="fa fa-close" aria-hidden="true"> </i>
            </td>
        );
    }
};
