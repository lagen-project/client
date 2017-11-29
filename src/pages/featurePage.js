import React from 'react';
import _ from 'lodash';

import Breadcrumb from '../blocks/breadcrumb';
import Description from '../blocks/description';
import FeatureModeButton from '../blocks/featureModeButton';
import FeatureModel from '../models/featureModel';
import FeatureRunButton from '../blocks/featureRunButton';
import FeatureSaveButton from '../blocks/featureSaveButton';
import NetworkErrorHandler from '../handlers/networkErrorHandler';
import PlusButton from '../blocks/plusButton';
import ProjectModel from '../models/projectModel';
import Scenario from '../blocks/scenario';

export default class FeaturePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feature: null,
            mode: 'read',
            animate: null,
            running: false,
            results: null,
            project: '',
            projectSteps: []
        };
    }

    componentWillMount() {
        FeatureModel
            .read(this.props.match.params.projectSlug, this.props.match.params.featureSlug)
            .then(feature => this.setState({ feature }), NetworkErrorHandler.handle);
        ProjectModel
            .read(this.props.match.params.projectSlug)
            .then(project => { this.setState({ project }); }, NetworkErrorHandler.handle);
        ProjectModel
            .steps(this.props.match.params.projectSlug)
            .then(steps => { this.setState({ projectSteps: steps }); }, NetworkErrorHandler.handle);
    }

    handleDescriptionChange = (description) => {
        let feature = this.state.feature;

        feature.description = description;

        this.setState({ feature });
    };

    handleScenarioChange = (e) => {
        let feature = this.state.feature;

        feature.scenarios[e.key] = e.scenario;

        this.setState({ feature });
    };

    handleScenarioAdd = () => {
        let feature = this.state.feature;

        feature.scenarios.push({
            name: '',
            type: 'regular',
            steps: [],
            examples: []
        });
        this.setState({ feature });
    };

    handleScenarioClose = (scenarioId) => {
        let feature = this.state.feature;

        feature.scenarios.splice(scenarioId, 1);

        this.setState({ feature });
    };

    toggleMode = () => {
        this.setState({mode: this.state.mode === 'read' ? 'write' : 'read'});
    };

    computeAvailableStepSentences = () => {
        if (!this.state.feature) {
            return [];
        }

        return _.uniq(_.flatten(this
            .state
            .feature
            .scenarios
            .map(scenario => {
                return scenario.steps.map(step => step.sentence);
            }))
            .concat(this.state.projectSteps)
            .sort())
        ;
    };

    saveFeature = () => {
        FeatureModel
            .edit(
                this.props.match.params.projectSlug,
                this.props.match.params.featureSlug,
                this.state.feature
            )
            .then(() => {
                this.setState({ animate: 'success' });
                setTimeout(this.stopAnimation, 2000);
            }, NetworkErrorHandler.handle)
        ;
    };

    runFeature = () => {
        this.setState({running: true});
        FeatureModel
            .run(this.props.match.params.projectSlug, this.props.match.params.featureSlug)
            .then(results => {
                this.setState({running: false, results});
            }, NetworkErrorHandler.handle);
    };

    stopAnimation = () => {
        this.setState({ animate: null })
    };

    render() {
        return this.state.feature === null ? null : (
            <div className={`page featurePage featurePage--${this.state.mode}`}>
                <h1>{`Feature "${this.state.feature.name}"`}</h1>

                <Breadcrumb routes={[
                    {label: 'Projects', link: '/'},
                    {
                        label: this.state.project ? this.state.project.name : '',
                        link: this.state.project ? `/project/${this.state.project.slug}` : ''
                    },
                    {
                        label: this.state.feature.name
                    }
                ]}/>

                <FeatureModeButton mode={this.state.mode} onClick={this.toggleMode} />
                <FeatureSaveButton animate={this.state.animate} onClick={this.saveFeature} />
                {this.state.feature.runnable ? <FeatureRunButton animate={this.state.running} onClick={this.runFeature} /> : null}

                <Description value={this.state.feature.description} onChange={this.handleDescriptionChange} />
                {this.state.feature.scenarios.map((scenario, id) => (
                    <Scenario
                        scenario={scenario}
                        key={id}
                        id={id}
                        onChange={this.handleScenarioChange}
                        onClose={this.handleScenarioClose}
                        backgroundable={id === 0}
                        featureMode={this.state.mode}
                        result={this.state.results ? this.state.results[id] : null}
                    />
                ))}
                {this.state.mode === 'write' ? (
                    <PlusButton onClick={this.handleScenarioAdd} />
                ) : null}
                <datalist id="availableSentences">
                    {this.computeAvailableStepSentences().map((sentence, key) => <option value={sentence} key={key} />)}
                </datalist>
            </div>
        );
    }
};
