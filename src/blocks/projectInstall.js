import React from 'react';

import NetworkErrorHandler from '../handlers/networkErrorHandler';
import ProjectModel from '../models/projectModel';

export default class ProjectInstall extends React.Component {
    constructor(props) {
        super(props);

        this.interval = null;
        this.state = {
            gitInfo: this.props.project.gitInfo,
            installing: false,
            output: ''
        };
    }

    componentDidUpdate() {
        const textarea = document.getElementById("projectInstall-output");

        textarea.scrollTop = textarea.scrollHeight;
    }

    updateInstall = () => {
        ProjectModel
            .installStatus(this.props.project.slug)
            .then((result) => {
                if (['ongoing', 'pending'].indexOf(result.status) === -1) {
                    this.setState({ installing: false });
                    if (this.interval !== null) {
                        clearInterval(this.interval);
                        this.interval = null;
                        if (result.status !== 'none') {
                            ProjectModel
                                .gitInfo(this.props.project.slug)
                                .then(gitInfo => {
                                    this.setState({gitInfo});
                                })
                        }
                    }
                } else {
                    this.setState({ installing: true, output: result.result });
                }
            })
        ;
    };

    install = () => {
        if (!this.state.installing) {
            this.setState({installing: true});
            ProjectModel
                .install(this.props.project.slug)
                .then(() => {
                    this.updateInstall();
                    this.interval = setInterval(this.updateInstall, 3000);
                })
            ;
        }
    };

    render() {
        return (
            <div className={`projectInstall`}>
                <div className="projectInstall-infoBar grid">
                    <div
                        className={`projectInstall-button${this.state.installing ? ' projectInstall-button--installing' : ''}`}
                        onClick={this.install}
                    >
                        <i
                            className="fa fa-download"
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
                <textarea
                    id="projectInstall-output"
                    className={`projectInstall-output${this.state.installing ? ' projectInstall-output--active' : ''}`}
                    value={this.state.output}
                />
            </div>
        );
    }
};
