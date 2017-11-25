import React from 'react';

import config from '../config.json';

export default class RestModel {
    constructor() {
        this.config = config;
    }

    get(uri) {
        return fetch(`${config.api}/${uri}`).then(response => response.json());
    }

    post(uri, body) {
        return fetch(`${config.api}/${uri}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    put(uri, body) {
        return fetch(`${config.api}/${uri}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    del(uri) {
        return fetch(`${config.api}/${uri}`, { method: 'DELETE' }).then(response => response.json());
    }

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
