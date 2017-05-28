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
        const additionalClass = this.props.animate ? ` featureSaveButton-${this.props.animate}` : '';

        return (
            <div
                className={`featureSaveButton ${additionalClass}`}
                onClick={this.handleClick}
            >
                <i className="fa fa-save" aria-hidden="true"> </i>
            </div>
        );
    }
};
