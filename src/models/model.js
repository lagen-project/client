import React from 'react';

import config from '../config.json';

export default class Model {
    fetch(uri, method, body) {
        return fetch(`${config.api}/${uri}`, {
            method,
            body: body ? JSON.stringify(body) : null,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.ok ? response.json() : Promise.reject(response));
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
};
