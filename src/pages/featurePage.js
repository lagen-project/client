import React from 'react';

import FeatureModeButton from '../blocks/featureModeButton';
import FeatureModel from '../models/featureModel';
import PlusButton from '../blocks/plusButton';
import Scenario from '../blocks/scenario';

export default class FeaturePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feature: null,
            mode: 'read'
        };

        this.handleScenarioAdd = this.handleScenarioAdd.bind(this);
        this.handleScenarioChange = this.handleScenarioChange.bind(this);
        this.handleScenarioClose = this.handleScenarioClose.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
    }

    componentWillMount() {
        FeatureModel
            .read(this.props.match.params.projectSlug, this.props.match.params.featureSlug)
            .then(feature => this.setState({ feature }));
    }

    handleScenarioChange(e) {
        let feature = this.state.feature;

        feature.scenarios[e.key] = e.scenario;
        console.log(feature);
        this.setState({ feature });
    }

    handleScenarioAdd() {
        let feature = this.state.feature;

        feature.scenarios.push({
            name: '',
            type: 'regular',
            steps: []
        });
        this.setState({ feature });
    }

    handleScenarioClose(scenarioId) {
        let feature = this.state.feature;

        feature.scenarios.splice(scenarioId, 1);

        this.setState({ feature });
    }

    toggleMode() {
        this.setState({mode: this.state.mode === 'read' ? 'write' : 'read'});
    }

    render() {
        return this.state.feature === null ? null : (
            <div className="page featurePage">
                <h1>{`Feature "${this.state.feature.name}"`}</h1>
                <FeatureModeButton mode={this.state.mode} onClick={this.toggleMode} />
                {this.state.feature.scenarios.map((scenario, id) => (
                    <Scenario
                        scenario={scenario}
                        key={id}
                        id={id}
                        onChange={this.handleScenarioChange}
                        onClose={this.handleScenarioClose}
                        backgroundable={id === 0}
                        featureMode={this.state.mode}
                    />
                ))}
                {this.state.mode === 'write' ? (
                    <PlusButton onClick={this.handleScenarioAdd} />
                ) : null}
            </div>
        );
    }
};
