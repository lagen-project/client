import React from 'react';

export default class FeatureModeButton extends React.Component {
    render() {
        return (
            <div className="featureModeButton" onClick={this.props.onClick}>
                <i className={`fa fa-${this.props.mode === 'read' ? 'pencil' : 'eye'}`} aria-hidden="true"> </i>
            </div>
        );
    }
};
