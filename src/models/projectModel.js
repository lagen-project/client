import React from 'react';

import config from '../config.json';
import RestModel from './restModel';

export default new class ProjectModel extends RestModel {
    constructor() {
        super();

        this.resourceName = 'projects';
    }

    install(id) {
        return fetch(`${config.api}/${this.resourceName}/${id}/install`).then(response => response.json());
    }
};
