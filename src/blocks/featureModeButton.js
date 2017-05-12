import React from 'react';

export default class FeatureModeButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <div className="featureModeButton" onClick={this.handleClick}>
                <i className={`fa fa-${this.props.mode === 'read' ? 'pencil' : 'eye'}`} aria-hidden="true"> </i>
            </div>
        );
    }
};
