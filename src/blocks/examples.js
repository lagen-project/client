import _ from 'lodash';
import React from 'react';

export default class Scenario extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parameters: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            parameters: this.getParameters(nextProps.steps)
        });
    }

    getParameters = (steps) => {
        const re = /<(\w+)>/g;

        return _.uniq(_.flatten(steps.map(step => {
            let matches = [];

            while (true) {
                const match = re.exec(step.sentence);

                if (!match) {
                    break;
                }
                matches.push(match[1]);
            }

            return matches;
        })));
    };

    render() {
        return this.state.parameters.length ? (
            <div className="examples">
                <table>
                    <thead>
                        <tr>
                            {this.state.parameters.map((param, i) => <th key={i}>{ param }</th>)}
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        ) : null;
    }
};
