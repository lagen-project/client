import React from 'react';

import Scenario from '../blocks/scenario';

export default class FeaturePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feature: null
        };

        this.handleScenarioChange = this.handleScenarioChange.bind(this);
    }

    componentWillMount() {
        this.setState({
            feature: {
                id: 1,
                name: "Testing stuff",
                scenarios: [
                    {
                        name: 'Prequel',
                        type: 'background',
                        steps: [
                            {
                                type: 'Given',
                                sentence: 'I have something like this :',
                                parameter: {
                                    type: 'table',
                                    value: [
                                        ['id', 'name'],
                                        ['1', 'Roger']
                                    ]
                                }
                            },
                            {
                                type: 'And',
                                sentence: 'Something else like this :',
                                parameter: {
                                    type: 'string',
                                    value: "hohoho\nhihihi"
                                }
                            }
                        ]
                    },
                    {
                        name: 'Actually do the testing',
                        type: 'regular',
                        steps: [
                            {
                                type: 'Given',
                                sentence: 'I send a RabbitMQ message'
                            },
                            {
                                type: 'Then',
                                sentence: 'I should be happy with',
                                parameter: {
                                    type: 'string',
                                    value: "hohoho\nhihihi"
                                }
                            }
                        ]
                    }
                ]
            }
        });
    }

    handleScenarioChange(e) {
        let feature = this.state.feature;

        feature.scenarios[e.id] = e.scenario;
        console.log(feature);
        this.setState({ feature });
    }

    render() {
        return this.state.feature === null ? null : (
            <div className="page featurePage">
                <h1>{`Feature "${this.state.feature.name}"`}</h1>

                {this.state.feature.scenarios.map((scenario, id) => (
                    <Scenario
                        scenario={scenario}
                        key={id}
                        id={id}
                        onChange={this.handleScenarioChange}
                    />
                ))}
            </div>
        );
    }
};
