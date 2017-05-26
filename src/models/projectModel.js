import React from 'react';

import RestModel from './restModel';

export default new class ProjectModel extends RestModel {
    constructor() {
        super();

        this.resourceName = 'projects';
    }
};
