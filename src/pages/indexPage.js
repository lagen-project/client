import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

import NetworkErrorHandler from "../handlers/networkErrorHandler";
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

    addProject = (projectName) => {
        ProjectModel.create({
            name: projectName
        }).then(
            () => this.listProjects(),
            NetworkErrorHandler.handle
        );
    };

    listProjects = () => {
        ProjectModel.list().then(projects => {
            this.setState({ projects });
        }, NetworkErrorHandler.handle);
    };

    render() {
        return (
            <div className="page indexPage">
                <h1>Projects</h1>

                {_.chunk(this.state.projects, 4).map((chunk, chunkKey) =>
                    <div key={chunkKey} className="grid txtcenter has-gutter indexPage-row">
                        {chunk.map((project, key) => (
                            <div className="one-quarter" key={key}>
                                <Link to={`/project/${project.slug}`} className="indexPage-link">
                                    {project.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                <NewProject onSubmit={this.addProject} />
            </div>
        );
    }
};
