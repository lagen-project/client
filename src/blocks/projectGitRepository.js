import React from 'react';

import ProjectModel from '../models/projectModel';

export default class ProjectGitRepository extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayed: false,
            projectGitRepository: this.props.project.gitRepository
        };

        this.displayForm = this.displayForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleProjectGitRepositoryChange = this.handleProjectGitRepositoryChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.project) !== JSON.stringify(this.props.project)) {
            this.setState({ projectGitRepository: nextProps.project.gitRepository });
        }
    }

    displayForm() {
        this.setState({ displayed: true });
    }

    hideForm() {
        this.setState({ displayed: false });
    }

    submitForm() {
        ProjectModel.edit({
            slug: this.props.project.slug,
            gitRepository: this.state.projectGitRepository
        }).then(() => {
            this.setState({ displayed: false });
        });
    }

    handleProjectGitRepositoryChange(e) {
        this.setState({ projectGitRepository: e.target.value });
    }

    render() {
        return (
            <div className={`projectGitRepository grid`}>
                <div className="projectGitRepository-button" onClick={this.displayForm}>
                    <i className="fa fa-code-fork"> </i>
                </div>
                {this.state.displayed ? (
                    <div className="projectGitRepository-form grid">
                        <input
                            type="text"
                            placeholder="Project's git repository..."
                            autoFocus={true}
                            onChange={this.handleProjectGitRepositoryChange}
                            value={this.state.projectGitRepository}
                        />
                        <div className="projectGitRepository-okButton" onClick={this.submitForm}>
                            <i className="fa fa-check" aria-hidden="true"> </i>
                        </div>
                        <div className="projectGitRepository-closeButton" onClick={this.hideForm}>
                            <i className="fa fa-close" aria-hidden="true"> </i>
                        </div>
                    </div>
                ) : (
                    <div className="projectGitRepository-name">{this.state.projectGitRepository}</div>
                )}
            </div>
        );
    }
};
