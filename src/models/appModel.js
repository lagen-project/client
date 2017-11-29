import React from 'react';

import config from '../config.json';
import Model from './model';

export default new class AppModel extends Model {
    login(username, password) {
        let data = new FormData();

        data.append('_username', username);
        data.append('_password', password);

        return fetch(`${config.api}/login_check`, {
            method: 'POST',
            body: data
        }).then(response => {
            if (!response.ok) {
                return Promise.reject(response.status);
            }

            return response.json().then(res => {
                localStorage.setItem('token', res.token);
            });
        });
    }

    me() {
        return this.get('me');
    }
};
