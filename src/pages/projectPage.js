import React from 'react';
import { Link } from 'react-router-dom';

import ProjectModel from '../models/projectModel';

export default class ProjectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null
        }
    }

    componentWillMount() {
        ProjectModel.read(this.props.match.params.projectSlug).then(project => {
            this.setState({ project });
        });
    }

    render() {
        return this.state.project === null ? null : (
            <div className="page projectPage">
                <h1>{this.state.project.name}</h1>

                <div className="grid txtcenter has-gutter">
                    {this.state.project.features.map((feature, key) => {
                        return (
                            <div className="one-quarter" key={key}>
                                <Link
                                    to={`/project/${this.props.match.params.projectSlug}/feature/${feature.slug}`}
                                    className="projectPage-link"
                                >
                                    {feature.slug}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
};
