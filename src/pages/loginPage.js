import React from 'react';

import Login from '../blocks/login';

export default class LoginPage extends React.Component {
    handleLoginSuccess = () => {
        window.location = '/';
    };

    render() {
        return <div className="page loginPage">
            <Login onLoginSuccess={this.handleLoginSuccess} />
        </div>;
    }
};
