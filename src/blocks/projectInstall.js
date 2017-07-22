import React from 'react';

import ProjectModel from '../models/projectModel';

export default class ProjectInstall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gitInfo: this.props.project.gitInfo,
            installing: false,
            output: ''
        };

        this.install = this.install.bind(this);
    }

    install() {
        if (!this.state.installing) {
            this.setState({installing: true});

            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                document.getElementById("projectInstall-output").scrollTop =
                    document.getElementById("projectInstall-output").scrollHeight;
                if (xhr.readyState === XMLHttpRequest.LOADING) {
                    this.setState({ output: xhr.responseText });
                } else if (xhr.readyState === XMLHttpRequest.DONE) {
                    ProjectModel
                        .gitInfo(this.props.project.slug)
                        .then(gitInfo => this.setState({
                            gitInfo,
                            installing: false,
                            output: xhr.responseText
                        }));
                    this.setState({ output: xhr.responseText, installing: false });
                }
            };
            xhr.open('GET', ProjectModel.getInstallUrl(this.props.project.slug), true);
            xhr.send();
        }
    }

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
