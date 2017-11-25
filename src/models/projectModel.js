import React from 'react';

import config from '../config.json';
import RestModel from './restModel';

export default new class ProjectModel extends RestModel {
    constructor() {
        super();

        this.resourceName = 'projects';
    }

    install(id, onReadyStateChange) {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = onReadyStateChange;
        xhr.open('GET', `${config.api}/${this.resourceName}/${id}/install`, true);
        xhr.send();

        return xhr;
    }

    gitInfo(id) {
        return this.get(`${this.resourceName}/${id}/git`);
    }

    steps(id) {
        return this.get(`${this.resourceName}/${id}/steps`);
    }
};
