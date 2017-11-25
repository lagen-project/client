import React from 'react';

import Model from './model';

export default class RestModel extends Model {
    create(resource) {
        return this.post(this.resourceName, resource);
    }

    edit(resource) {
        return this.put(`${this.resourceName}/${resource.slug}`, resource);
    }

    list() {
        return this.get(this.resourceName);
    }

    read(id) {
        return this.get(`${this.resourceName}/${id}`);
    }

    remove(id) {
        return this.del(`${this.resourceName}/${id}`);
    }
};
