import React from 'react';

export default class PlusButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <div className="plusButton" onClick={this.handleClick}>
                <i className="fa fa-plus" aria-hidden="true"> </i>
            </div>
        );
    }
};
