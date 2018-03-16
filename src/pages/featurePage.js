import React from 'react';
import { Redirect } from 'react-router';
import _ from 'lodash';

import Breadcrumb from '../blocks/breadcrumb';
import Confirm from "../blocks/confirm";
import DeleteButton from '../blocks/deleteButton';
import Description from '../blocks/description';
import FeatureModeButton from '../blocks/featureModeButton';
import FeatureModel from '../models/featureModel';
import FeatureRunButton from '../blocks/featureRunButton';
import FeatureSaveButton from '../blocks/featureSaveButton';
import NetworkErrorHandler from '../handlers/networkErrorHandler';
import Notification from '../blocks/notification';
import PlusButton from '../blocks/plusButton';
import ProjectModel from '../models/projectModel';
import ResultsButton from '../blocks/resultsButton';
import Scenario from '../blocks/scenario';

export default class FeaturePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feature: null,
            savedFeature: null,
            mode: 'read',
            animate: null,
            running: false,
            activeResults: false,
            results: null,
            project: '',
            projectSteps: [],
            runError: null,
            confirmDelete: false,
            redirectTo: null,
            draggingScenario: null
        };
    }

    componentWillMount() {
        FeatureModel
            .read(this.props.match.params.projectSlug, this.props.match.params.featureSlug)
            .then(feature => this.setState({ feature, savedFeature: JSON.stringify(feature) }), NetworkErrorHandler.handle);
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

    handleScenarioDragStart = (scenarioId) => {
        if (this.state.feature.scenarios[scenarioId].type !== 'background') {
            this.setState({
                draggingScenario: scenarioId
            });
        }
    };

    handleScenarioDragOver = (scenarioId) => {
        if (this.state.draggingScenario) {
            let feature = this.state.feature;
            const scenario = feature.scenarios[this.state.draggingScenario];

            if (feature.scenarios[scenarioId].type !== 'background') {
                feature.scenarios.splice(this.state.draggingScenario, 1);
                feature.scenarios.splice(scenarioId, 0, scenario);

                this.setState({feature, draggingScenario: scenarioId});
            }
        }
    };

    handleScenarioDragEnd = () => {
        this.setState({ draggingScenario: null });
    };

    handleRunError = (r) => {
        r.json().then(content => {
            if (content && content.error === 'feature_run') {
                this.setState({ runError: content.message });
            }
        });
    };

    handleRunErrorClose = () => {
        this.setState({ runError: null });
    };

    toggleMode = () => {
        this.setState({mode: this.state.mode === 'read' ? 'write' : 'read'});
    };

    handleResultsButtonClick = (e) => {
        e.preventDefault();

        if (this.state.results === null) {
            FeatureModel
                .lastResult(this.props.match.params.projectSlug, this.props.match.params.featureSlug)
                .then(results => {
                    this.setState({ results, activeResults: !!results && !!results.length });
                }, NetworkErrorHandler.handle)
        } else {
            this.setState({ activeResults: !this.state.activeResults });
        }
    };

    handleDeleteButtonClick = (e) => {
        e.preventDefault();
        this.setState({ confirmDelete: true });
    };

    handleDeleteOk = () => {
        FeatureModel
            .trash(this.props.match.params.projectSlug, this.props.match.params.featureSlug)
            .then(() => {
                this.setState({ redirectTo: `/project/${this.props.match.params.projectSlug }`});
            }, NetworkErrorHandler.handle)
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
                this.setState({ animate: 'success', savedFeature: JSON.stringify(this.state.feature) });
                setTimeout(() => { this.setState({ animate: null }); }, 2000);
            }, NetworkErrorHandler.handle)
        ;
    };

    runFeature = () => {
        this.setState({running: true});
        FeatureModel
            .run(this.props.match.params.projectSlug, this.props.match.params.featureSlug)
            .then(results => {
                this.setState({running: false, results, activeResults: true});
            }, (r) => {
                this.setState({ running: false });
                NetworkErrorHandler.handle(r, this.handleRunError);
            });
    };

    featureSynced = () => {
        return JSON.stringify(this.state.feature) === this.state.savedFeature;
    };

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />
        }

        const featureSynced = this.featureSynced();

        return this.state.feature === null ? null : (
            <div className={`page featurePage featurePage--${this.state.mode}${this.state.confirmDelete ? ' page--overlay' : ''}`}>
                {this.state.confirmDelete ? <Confirm
                    question="Are you sure you want to delete this feature ?"
                    onOk={this.handleDeleteOk}
                    onCancel={() => { this.setState({ confirmDelete: false }); }}
                /> : null}
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
                {this.state.feature.runnable && featureSynced ?
                    <FeatureRunButton animate={this.state.running} onClick={this.runFeature} /> : null
                }
                {featureSynced ?
                    <ResultsButton
                        onClick={this.handleResultsButtonClick}
                        active={this.state.activeResults && this.state.results}
                    /> : null
                }
                <DeleteButton onClick={this.handleDeleteButtonClick} />
                {this.state.runError ? (
                    <Notification type="error" message={this.state.runError} onClose={this.handleRunErrorClose} />
                ) : null}

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
                        result={featureSynced && this.state.results && this.state.activeResults ? this.state.results[id] : null}
                        onDragStart={this.handleScenarioDragStart}
                        onDragOver={this.handleScenarioDragOver}
                        onDragEnd={this.handleScenarioDragEnd}
                        dragging={this.state.draggingScenario === id}
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
