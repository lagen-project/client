import React from 'react';

import config from '../config.json';
import RestModel from './restModel';

export default new class ProjectModel extends RestModel {
    constructor() {
        super();

        this.resourceName = 'projects';
    }

    getInstallUrl(id) {
        return `${config.api}/${this.resourceName}/${id}/install`;
    }

    gitInfo(id) {
        return fetch(`${config.api}/${this.resourceName}/${id}/git`).then(response => response.json());
    }
};
