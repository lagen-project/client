import React from 'react';

export default class StepParameterTableDeleteColumnCell extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onDeleteColumn(this.props.column);
    }

    render() {
        return (
            <td onClick={this.handleClick}>
                x
            </td>
        );
    }
};
