import React from 'react';

export default class ExamplesDeleteRowCell extends React.Component {
    handleClick = () => {
        this.props.onDeleteRow(this.props.row);
    };

    render() {
        return (
            <td onClick={this.handleClick} className="examples-deleteRow">
                <i className="fa fa-close" aria-hidden="true"> </i>
            </td>
        );
    }
};
