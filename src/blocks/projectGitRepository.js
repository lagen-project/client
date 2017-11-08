import React from 'react';

import ProjectModel from '../models/projectModel';

export default class ProjectGitRepository extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayed: false,
            projectGitRepository: this.props.project.gitRepository,
            projectGitBranch: this.props.project.gitBranch ? this.props.project.gitBranch : 'master'
        };
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.project) !== JSON.stringify(this.props.project)) {
            this.setState({
                projectGitRepository: nextProps.project.gitRepository,
                projectGitBranch: nextProps.project.gitBranch ? nextProps.project.gitBranch : 'master'
            });
        }
    }

    displayForm = () => {
        this.setState({ displayed: true });
    };

    hideForm = () => {
        this.setState({ displayed: false });
    };

    submitForm = () => {
        ProjectModel.edit({
            slug: this.props.project.slug,
            gitRepository: this.state.projectGitRepository
        }).then(() => {
            this.setState({ displayed: false });
        });
    };

    handleProjectGitRepositoryChange = (e) => {
        this.setState({ projectGitRepository: e.target.value });
    };

    handleProjectGitBranchChange = (e) => {
        this.setState({ projectGitBranch: e.target.value });
    };

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
                            placeholder="Git repository..."
                            autoFocus={true}
                            onChange={this.handleProjectGitRepositoryChange}
                            value={this.state.projectGitRepository}
                        />
                        <input
                            type="text"
                            placeholder="Branch..."
                            onChange={this.handleProjectGitBranchChange}
                            value={this.state.projectGitBranch}
                        />
                        <div className="projectGitRepository-okButton" onClick={this.submitForm}>
                            <i className="fa fa-check" aria-hidden="true"> </i>
                        </div>
                        <div className="projectGitRepository-closeButton" onClick={this.hideForm}>
                            <i className="fa fa-close" aria-hidden="true"> </i>
                        </div>
                    </div>
                ) : (
                    <div className="projectGitRepository-name">
                        {this.state.projectGitRepository} ({this.state.projectGitBranch})
                    </div>
                )}
            </div>
        );
    }
};
