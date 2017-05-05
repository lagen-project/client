import React from 'react';

export default class CloseButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <div className="closeButton" onClick={this.handleClick}>
                <i className="fa fa-close" aria-hidden="true"> </i>
            </div>
        );
    }
};
