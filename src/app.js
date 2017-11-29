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

    render() {
        return (
            <div className="container">
                <Menu />
                {this.state.loggedIn ? <Routes /> : <Login onLoginSuccess={this.handleLoginSuccess} />}
            </div>
        );
    }
};
