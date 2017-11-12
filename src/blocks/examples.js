import _ from 'lodash';
import React from 'react';

import ExamplesCell from './examplesCell';
import ExamplesDeleteRowCell from './examplesDeleteRowCell';

export default class Examples extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parameters: this.getParameters(this.props.steps)
        };
    }

    componentWillReceiveProps(nextProps) {
        const newParameters = this.getParameters(nextProps.steps);

        if (JSON.stringify(newParameters) !== JSON.stringify(this.state.parameters)) {
            this.setState({
                parameters: newParameters
            });

            if (!newParameters) {
                this.props.onChange([]);
            } else {
                this.props.onChange(
                    this.props.examples.map(example => _.pick(_.assign(
                        _.zipObject(newParameters, _.times(newParameters.length, _.constant(''))),
                        example
                        ), newParameters)
                    )
                );
            }
        }
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

    handleRowAdd = () => {
        let examples = this.props.examples;
        let newRow = {};

        this.state.parameters.forEach(param => { newRow[param] = '' });
        examples.push(newRow);

        this.props.onChange(examples);
    };

    handleRowDelete = (row) => {
        let examples = this.props.examples;

        examples.splice(row, 1);

        this.props.onChange(examples);
    };

    handleExampleChange = (row, parameter, value) => {
        let examples = this.props.examples;

        examples[row][parameter] = value;

        this.props.onChange(examples);
    };

    render() {
        return this.state.parameters.length ? (
            <div className="examples">
                <h3>Examples</h3>
                <table>
                    <thead>
                        <tr>
                            {this.props.featureMode === 'write' ? (
                                <th className="examples-firstWriteCol" />
                            ) : null}
                            {this.state.parameters.map((param, i) => <th key={i}>{ param }</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.examples.map((example, row) =>
                            <tr key={row}>
                                {this.props.featureMode === 'write' ?
                                    <ExamplesDeleteRowCell onDeleteRow={this.handleRowDelete} row={row} />
                                : null}
                                {this.state.parameters.map((param, column) => <ExamplesCell
                                    key={column}
                                    row={row}
                                    parameter={param}
                                    value={example[param]}
                                    featureMode={this.props.featureMode}
                                    result={this.props.result ?
                                        this.props.result[this.state.parameters.length * row + column] : null}
                                    onChange={this.handleExampleChange}
                                />)}
                            </tr>
                        )}
                        {this.props.featureMode === 'write' ? (
                            <tr className="examples-placeholderRow">
                                <td> </td>
                                <td colSpan={this.state.parameters.length} onClick={this.handleRowAdd}>
                                    <i className="fa fa-arrow-down" aria-hidden="true"> </i>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        ) : null;
    }
};
