import React from 'react';

import RestModel from './restModel';

export default new class FeatureModel extends RestModel {
    constructor() {
        super();

        this.resourceName = 'features';
    }

    create(projectSlug, resource) {
        return this.post(`projects/${projectSlug}/${this.resourceName}`, resource);
    }

    edit(projectSlug, featureSlug, resource) {
        return this.put(`projects/${projectSlug}/${this.resourceName}/${featureSlug}`, resource);
    }

    read(projectSlug, featureSlug) {
        return this.get(`projects/${projectSlug}/${this.resourceName}/${featureSlug}`);
    }

    run(projectSlug, featureSlug) {
        return this.get(`projects/${projectSlug}/${this.resourceName}/${featureSlug}/run`);
    }
};
