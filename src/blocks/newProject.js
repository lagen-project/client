import React from 'react';

export default class NewProject extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayed: false,
            projectName: ''
        };
    }

    displayForm = () => {
        this.setState({ displayed: true });
    };

    hideForm = () => {
        this.setState({ displayed: false });
    };

    submitForm = () => {
        this.props.onSubmit(this.state.projectName);
        this.setState({ displayed: false });
    };

    handleProjectNameChange = (e) => {
        this.setState({ projectName: e.target.value });
    };

    render() {
        return (
            <div className={`newProject`}>
                {this.state.displayed ? (
                    <div className="newProject-form grid">
                        <input
                            type="text"
                            placeholder="Project name..."
                            autoFocus={true}
                            onChange={this.handleProjectNameChange}
                            value={this.state.projectName}
                        />
                        <div className="newProject-okButton" onClick={this.submitForm}>
                            <i className="fa fa-check" aria-hidden="true"> </i>
                        </div>
                        <div className="newProject-closeButton" onClick={this.hideForm}>
                            <i className="fa fa-close" aria-hidden="true"> </i>
                        </div>
                    </div>
                ) : (
                    <div className="newProject-button" onClick={this.displayForm}>
                        New project
                    </div>
                )}
            </div>
        );
    }
};
