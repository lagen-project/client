import React from 'react';

import ProjectModel from '../models/projectModel';

export default class ProjectInstall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className={`projectInstall`}>
                <div className="projectInstall-button">
                    <i className="fa fa-download" title="Install project"> </i>
                </div>
            </div>
        );
    }
};
