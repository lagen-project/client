import React from 'react';

import AppModel from '../models/appModel';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            failed: false
        };
    }

    handleUsernameChange = (e) => {
        this.setState({ username: e.target.value });
    };

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    };

    handleLoginFailure = () => {
        this.setState({ failed: true });
        setTimeout(this.resetFailure, 1000);
    };

    resetFailure = () => {
        this.setState({ failed: false });
    };

    handleSubmit = () => {
        AppModel
            .login(this.state.username, this.state.password)
            .then(this.props.onLoginSuccess, this.handleLoginFailure);
    };

    render() {
        return (
            <div className="login">
                <input
                    type="text"
                    placeholder="Username"
                    onChange={this.handleUsernameChange}
                    value={this.state.username}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                />
                <button
                    className={`login-submit${this.state.failed ? ' login-submit--failed' : ''}`}
                    onClick={this.handleSubmit}
                >
                    Login
                </button>
            </div>
        );
    }
};
