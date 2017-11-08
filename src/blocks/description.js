import React from 'react';

export default class Description extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: this.props.value ? this.props.value : '',
            mode: 'read'
        };
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.value) !== JSON.stringify(this.state.description)) {
            this.setState({ description: nextProps.value ? nextProps.value : ''});
        }
    }

    switchToWrite = () => {
        this.setState({mode: 'write'});
    };

    switchToRead = () => {
        this.setState({mode: 'read'});
    };

    handleDescriptionChange = (e) => {
        this.props.onChange(e.target.value);
    };

    render() {
        return (
            <div
                className={`description description--${this.state.mode}`}
                onClick={this.switchToWrite}
                onBlur={this.switchToRead}
            >
                {this.state.mode === 'read' ? (
                    this
                        .state
                        .description
                        .split("\n")
                        .map((slice, key) => <p key={key}>{ slice ? slice : '\u00A0' }</p>)
                ) : (
                    <textarea
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                        placeholder="Description"
                        autoFocus={true}
                    />
                )}
            </div>
        );
    }
};
