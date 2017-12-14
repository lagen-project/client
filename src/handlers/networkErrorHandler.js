import React from 'react';

export default new class NetworkErrorHandler {
    handle  = (r, errorHandler = () => {}) => {
        if (r.status === 401) {
            localStorage.removeItem('token');
            window.location = '/';
        } else if (r.status >= 500) {
            errorHandler(r);
        }
    };
};
