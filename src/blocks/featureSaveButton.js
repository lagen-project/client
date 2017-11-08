import React from 'react';

export default class FeatureSaveButton extends React.Component {
    render() {
        const additionalClass = this.props.animate ? ` featureSaveButton-${this.props.animate}` : '';

        return (
            <div
                className={`featureSaveButton ${additionalClass}`}
                onClick={this.props.onClick}
            >
                <i className="fa fa-save" aria-hidden="true"> </i>
            </div>
        );
    }
};
