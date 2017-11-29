import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../icons/logo';

export default class Menu extends React.Component {
    handleLogout = (e) => {
        e.preventDefault();
        this.props.onLogout();
    };

    render() {
        return (
            <ul className="menu">
                <li className="menu-initial"><Link to="/"><Logo /></Link></li>
                <li className="menu-auto">

                </li>
                {this.props.loggedIn ? (
                    <li className="menu-initial">
                        <button onClick={this.handleLogout}>
                            <span className="fa fa-sign-out" />
                        </button>
                    </li>
                ) : null}
            </ul>
        );
    }
};
