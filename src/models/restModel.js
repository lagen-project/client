import React from 'react';

import config from '../config.json';

export default class RestModel {
    create(resource) {
        return fetch(
            `${config.api}/${this.resourceName}`,
            {
                method: 'POST',
                body: JSON.stringify(resource),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.json());
    }

    edit(resource) {
        return fetch(
            `${config.api}/${this.resourceName}/${resource.id}`,
            {
                method: 'PUT',
                body: JSON.stringify(resource),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => response.json());
    }

    list() {
        return fetch(`${config.api}/${this.resourceName}`).then(response => response.json());
    }

    read(id) {
        return fetch(`${config.api}/${this.resourceName}/${id}`).then(response => response.json());
    }

    remove(id) {
        return fetch(
            `${config.api}/${this.resourceName}/${id}`,
            {
                method: 'DELETE',
            }
        );
    }
};
