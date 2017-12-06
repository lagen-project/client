import React from 'react';

import RestModel from './restModel';

export default new class ProjectModel extends RestModel {
    constructor() {
        super();

        this.resourceName = 'projects';
    }

    install(id) {
        return this.get(`${this.resourceName}/${id}/install`);
    }

    installStatus(id) {
        return this.get(`${this.resourceName}/${id}/install-status`);
    }

    gitInfo(id) {
        return this.get(`${this.resourceName}/${id}/git`);
    }

    steps(id) {
        return this.get(`${this.resourceName}/${id}/steps`);
    }
};
