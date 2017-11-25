import React from 'react';

import config from '../config.json';

export default class RestModel {
    constructor() {
        this.token = null;
    }

    fetch(uri, method, body) {
        return fetch(`${config.api}/${uri}`, {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json());
    }

    get(uri) {
        return this.fetch(uri, 'GET');
    }

    post(uri, body) {
        return this.fetch(uri, 'POST', body);
    }

    put(uri, body) {
        return this.fetch(uri, 'PUT', body);
    }

    del(uri) {
        return this.fetch(uri, 'DELETE');
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
