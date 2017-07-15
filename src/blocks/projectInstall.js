import React from 'react';

import ProjectModel from '../models/projectModel';

export default class ProjectInstall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gitInfo: this.props.project.gitInfo,
            installing: false
        };

        this.install = this.install.bind(this);
    }

    install() {
        if (!this.state.installing) {
            this.setState({installing: true});
            ProjectModel
                .install(this.props.project.slug)
                .then(gitInfo => this.setState({
                    gitInfo,
                    installing: false
                }));
        }
    }

    render() {
        return (
            <div className={`projectInstall grid`}>
                <div
                    className={`projectInstall-button${this.state.installing ? ' projectInstall-button--installing' : ''}`}
                    onClick={this.install}
                >
                    <i
                        className={`fa fa-${this.state.installing ? 'cogs' : 'download'}`}
                        title={this.state.installing ? 'Installing' : 'Install'}
                    > </i>
                </div>
                {this.state.gitInfo ? (
                    <div className="projectInstall-info">
                        <span className="projectInstall-commitDate">{this.state.gitInfo.date}</span>
                        <span className="projectInstall-commitAuthor">{this.state.gitInfo.author}</span>
                        <span className="projectInstall-commit">{this.state.gitInfo.commit}</span>
                    </div>
                ) : null}
            </div>
        );
    }
};
