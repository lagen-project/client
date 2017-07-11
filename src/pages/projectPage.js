import React from 'react';
import { Link } from 'react-router-dom';

import FeatureModel from '../models/featureModel';
import NewFeature from '../blocks/newFeature';
import ProjectGitRepository from '../blocks/projectGitRepository';
import ProjectInstall from '../blocks/projectInstall';
import ProjectModel from '../models/projectModel';

export default class ProjectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null
        };

        this.addFeature = this.addFeature.bind(this);
    }

    componentWillMount() {
        this.readProject();
    }

    readProject() {
        ProjectModel.read(this.props.match.params.projectSlug).then(project => {
            this.setState({ project });
        });
    }

    addFeature(featureName) {
        FeatureModel.create(this.props.match.params.projectSlug, {
            name: featureName
        }).then(() => this.readProject());
    }

    render() {
        return this.state.project === null ? null : (
            <div className="page projectPage">
                <h1>{this.state.project.name}</h1>
                <div className="projectPage-intro">
                    <ProjectGitRepository
                        project={this.state.project}
                    />
                    <ProjectInstall project={this.state.project} />
                </div>

                <div className="grid txtcenter has-gutter">
                    {this.state.project.features.map((feature, key) => {
                        return (
                            <div className="one-quarter" key={key}>
                                <Link
                                    to={`/project/${this.props.match.params.projectSlug}/feature/${feature.slug}`}
                                    className="projectPage-link"
                                >
                                    {feature.name}
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <NewFeature onSubmit={this.addFeature} />
            </div>
        );
    }
};
