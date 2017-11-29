import React from 'react';

export default new class NetworkErrorHandler {
    handle  = (e) => {
        if (e === 401) {
            localStorage.removeItem('token');
            window.location = '/';
        }
    };
};
