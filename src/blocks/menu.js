import React from 'react';
import { Link } from 'react-router-dom';

import AppModel from '../models/appModel';
import Logo from '../icons/logo';
import NetworkErrorHandler from '../handlers/networkErrorHandler';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };
    }

    componentWillUpdate() {
        AppModel.me().then(user => this.setState({ username: user.username }), NetworkErrorHandler.handle);
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.onLogout();
    };

    render() {
        return (
            <ul className="menu">
                <li className="menu-initial"><Link to="/"><Logo /></Link></li>
                <li className="menu-auto" />
                {this.props.loggedIn ? (
                    <li className="menu-initial">
                        <button onClick={this.handleLogout}>
                            {this.state.username}
                            {'\u00A0'}
                            <span className="fa fa-sign-out" />
                        </button>
                    </li>
                ) : null}
            </ul>
        );
    }
};
