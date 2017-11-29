import React from 'react';
import { Route } from 'react-router-dom';

import FeaturePage from './pages/featurePage';
import IndexPage from './pages/indexPage';
import ProjectPage from './pages/projectPage';

const Fragment = React.Fragment; // to be replaced by <> when babel 7 is stable enough

export default class Routes extends React.Component {
    render() {
        return (
            <Fragment>
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/project/:projectSlug" component={ProjectPage} />
                <Route exact path="/project/:projectSlug/feature/:featureSlug" component={FeaturePage} />
            </Fragment>
        );
    }
};
