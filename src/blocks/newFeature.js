import React from 'react';

export default class NewFeature extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayed: false,
            featureName: ''
        };
    }

    displayForm = () => {
        this.setState({ displayed: true });
    };

    hideForm = () => {
        this.setState({ displayed: false });
    };

    submitForm = () => {
        this.props.onSubmit(this.state.featureName);
        this.setState({ displayed: false });
    };

    handleFeatureNameChange = (e) => {
        this.setState({ featureName: e.target.value });
    };

    render() {
        return (
            <div className={`newFeature`}>
                {this.state.displayed ? (
                    <div className="newFeature-form grid">
                        <input
                            type="text"
                            placeholder="Feature name..."
                            autoFocus={true}
                            onChange={this.handleFeatureNameChange}
                            value={this.state.featureName}
                        />
                        <div className="newFeature-okButton" onClick={this.submitForm}>
                            <i className="fa fa-check" aria-hidden="true"> </i>
                        </div>
                        <div className="newFeature-closeButton" onClick={this.hideForm}>
                            <i className="fa fa-close" aria-hidden="true"> </i>
                        </div>
                    </div>
                ) : (
                    <div className="newFeature-button" onClick={this.displayForm}>
                        New feature
                    </div>
                )}
            </div>
        );
    }
};
