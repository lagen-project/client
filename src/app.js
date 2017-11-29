import React from 'react';

import Login from './blocks/login';
import Menu from './blocks/menu';
import Routes from './routes';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        };
    }

    handleLoginSuccess = () => {
        this.setState({ loggedIn: true });
    };

    handleLogout = () => {
        localStorage.removeItem('token');
        this.setState({ loggedIn: false });
    };

    render() {
        return (
            <div className="container">
                <Menu loggedIn={this.state.loggedIn} onLogout={this.handleLogout} />
                {this.state.loggedIn ? <Routes /> : <Login onLoginSuccess={this.handleLoginSuccess} />}
            </div>
        );
    }
};
