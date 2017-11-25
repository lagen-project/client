import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import Logo from './icons/logo';
import FeaturePage from './pages/featurePage';
import IndexPage from './pages/indexPage';
import LoginPage from './pages/loginPage';
import ProjectPage from './pages/projectPage';

ReactDOM.render(
    <BrowserRouter>
        <div className="container">
            <ul className="menu">
                <li><Link to="/"><Logo /></Link></li>
            </ul>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/project/:projectSlug" component={ProjectPage} />
            <Route exact path="/project/:projectSlug/feature/:featureSlug" component={FeaturePage} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);
