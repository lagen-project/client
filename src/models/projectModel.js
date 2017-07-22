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
        return fetch(`${config.api}/${this.resourceName}/${id}/git`).then(response => response.json());
    }
};
