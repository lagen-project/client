import React from 'react';
import { Link } from 'react-router-dom';

export default class ProjectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            project: null
        }
    }

    componentWillMount() {
        this.setState({
            project: {
                features: [
                    {
                        id: 1,
                        name: 'Testing stuff'
                    },
                    {
                        id: 2,
                        name: 'Testing some other stuff'
                    }
                ]
            }
        });
    }

    render() {
        return this.state.project === null ? null : (
            <div className="page projectPage">
                <h1>Projects</h1>

                <div className="grid txtcenter has-gutter">
                    {this.state.project.features.map((feature, id) => {
                        return (
                            <div className="one-quarter" key={id}>
                                <Link to={`/project/1/feature/${feature.id}`} className="projectPage-link">
                                    {feature.name}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
};
