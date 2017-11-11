import React from 'react';

export default class ExamplesCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'read'
        };
    }

    switchToRead = () => {
        if (this.props.featureMode === 'write') {
            this.setState({mode: 'read'});
        }
    };

    switchToWrite = () => {
        if (this.props.featureMode === 'write') {
            this.setState({mode: 'write'});
        }
    };

    handleValueChange = (e) => {
        this.setState({ value: e.target.value });
        this.props.onChange(this.props.row, this.props.parameter, e.target.value);
    };

    render() {
        return (
            <td onClick={this.switchToWrite} onBlur={this.switchToRead} className={`examplesCell examplesCell--${this.state.mode}Mode`}>
                {this.state.mode === 'read' || this.props.featureMode === 'read' ? (
                    this.props.value ? this.props.value : <span className="examplesCell-placeholder">-</span>
                ) : (
                    <input type="text" value={this.props.value} onChange={this.handleValueChange} autoFocus={true} />
                )}
            </td>
        );
    }
};
