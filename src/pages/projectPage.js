import _ from 'lodash';
import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Breadcrumb from '../blocks/breadcrumb';
import DeleteButton from '../blocks/deleteButton';
import FeatureModel from '../models/featureModel';
import NetworkErrorHandler from "../handlers/networkErrorHandler";
import NewFeature from '../blocks/newFeature';
import ProjectGitRepository from '../blocks/projectGitRepository';
import ProjectInstall from '../blocks/projectInstall';
import ProjectModel from '../models/projectModel';
import Confirm from "../blocks/confirm";

export default class ProjectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null,
            confirmDelete: false,
            redirectTo: null
        };
    }

    componentWillMount() {
        this.readProject();
    }

    readProject = () => {
        ProjectModel.read(this.props.match.params.projectSlug).then(project => {
            this.setState({ project });
        }, NetworkErrorHandler.handle);
    };

    addFeature = (featureName) => {
        FeatureModel.create(this.props.match.params.projectSlug, {
            name: featureName
        }).then(() => this.readProject(), NetworkErrorHandler.handle);
    };

    handleDeleteButtonClick = (e) => {
        e.preventDefault();
        this.setState({ confirmDelete: true });
    };

    handleDeleteOk = () => {
        ProjectModel
            .remove(this.props.match.params.projectSlug)
            .then(() => {
                this.setState({ redirectTo: '/'});
            }, NetworkErrorHandler.handle)
    };

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }

        return this.state.project === null ? null : (
            <div className="page projectPage">
                {this.state.confirmDelete ? <Confirm
                    question="Are you sure you want to delete the project ? This action is irreversible"
                    onOk={this.handleDeleteOk}
                    onCancel={() => { this.setState({ confirmDelete: false }); }}/> : null
                }
                <h1>{this.state.project.name}</h1>

                <Breadcrumb routes={[
                    {label: 'Projects', link: '/'},
                    {label: this.state.project ? this.state.project.name : ''}
                ]}/>

                <DeleteButton onClick={this.handleDeleteButtonClick} />

                <div className="projectPage-intro">
                    <ProjectGitRepository
                        project={this.state.project}
                    />
                    <ProjectInstall project={this.state.project} />
                </div>

                {_.chunk(this.state.project.features, 4).map((chunk, chunkKey) =>
                    <div className="grid txtcenter has-gutter" key={chunkKey}>
                        {chunk.map((feature, key) => {
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
                )}
                <NewFeature onSubmit={this.addFeature} />
            </div>
        );
    }
};
