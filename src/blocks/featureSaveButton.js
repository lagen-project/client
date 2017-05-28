import React from 'react';

export default class FeatureSaveButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <div className="featureSaveButton" onClick={this.handleClick}>
                <i className="fa fa-save" aria-hidden="true"> </i>
            </div>
        );
    }
};
