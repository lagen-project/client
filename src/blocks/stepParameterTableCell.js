import React from 'react';

export default class StepParameterTableCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value });
        }
    }

    handleValueChange = (e) => {
        this.setState({ value: e.target.value });
        this.props.onChange({
            row: this.props.row,
            column: this.props.column,
            value: e.target.value
        });
    };

    handleKeyDown = (e) => {
        if (e.keyCode === 9) { // if tab pressed
            e.preventDefault();
            this.props.onTabPressed(this.props.row, this.props.column);
        }
    };

    switchToWrite = () => {
        this.props.onSwitchToWrite(this.props.row, this.props.column);
    };

    render() {
        return (
            <td
                onClick={this.switchToWrite}
                onBlur={this.props.onSwitchToRead}
                className={`stepParameterTableCell stepParameterTableCell--${this.props.mode}Mode`}
            >
                {this.props.mode === 'read' || this.props.featureMode === 'read' ? (
                    this.state.value ? this.state.value : <span className="stepParameterTableCell-placeholder">-</span>
                ) : (
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleValueChange}
                        autoFocus={true}
                        onKeyDown={this.handleKeyDown}
                    />
                )}
            </td>
        );
    }
};
