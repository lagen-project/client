import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../icons/logo';

export default class Menu extends React.Component {
    render() {
        return (
            <ul className="menu">
                <li><Link to="/"><Logo /></Link></li>
            </ul>
        );
    }
};
