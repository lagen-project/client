import React from 'react';
import { Link } from 'react-router-dom';

import NewProject from "../blocks/newProject";
import ProjectModel from "../models/projectModel";

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: []
        };
    }

    componentWillMount() {
        this.listProjects();
    }

    handleNetworkError = (e) => {
        if (e === 401) {
            window.location = '/login';
        }
    };

    addProject = (projectName) => {
        ProjectModel.create({
            name: projectName
        }).then(
            () => this.listProjects(),
            this.handleNetworkError
        );
    };

    listProjects = () => {
        ProjectModel.list().then(projects => {
            this.setState({ projects });
        }, this.handleNetworkError);
    };

    render() {
        return (
            <div className="page indexPage">
                <h1>Projects</h1>

                <div className="grid txtcenter has-gutter">
                    {this.state.projects.map((project, key) => (
                        <div className="one-quarter" key={key}>
                            <Link to={`/project/${project.slug}`} className="indexPage-link">
                                {project.name}
                            </Link>
                        </div>
                    ))}
                </div>
                <NewProject onSubmit={this.addProject} />
            </div>
        );
    }
};
