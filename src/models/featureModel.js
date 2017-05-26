import React from 'react';

import RestModel from './restModel';

export default new class FeatureModel extends RestModel {
    constructor() {
        super();

        this.resourceName = 'features';
    }

    create(projectSlug, resource) {
        return fetch(
            `${this.config.api}/projects/${projectSlug}/${this.resourceName}`,
            {
                method: 'POST',
                body: JSON.stringify(resource),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.json());
    }
};
