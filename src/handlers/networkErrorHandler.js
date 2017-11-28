import React from 'react';

export default new class NetworkErrorHandler {
    handle  = (e) => {
        if (e === 401) {
            window.location = '/login';
        }
    };
};
