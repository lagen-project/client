import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import FeaturePage from './pages/featurePage';
import IndexPage from './pages/indexPage';
import ProjectPage from './pages/projectPage';

ReactDOM.render(
    <BrowserRouter>
        <div className="container">
            <ul className="menu">
                <li><Link to="/">Projects</Link></li>
            </ul>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/project/:projectSlug" component={ProjectPage} />
            <Route exact path="/project/:projectSlug/feature/:featureSlug" component={FeaturePage} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);
