import React from 'react';
import { Link } from 'react-router-dom';

export default class IndexPage extends React.Component {
    render() {
        return (
            <div className="page indexPage">
                <h1>Projects</h1>

                <div className="grid-6 txtcenter has-gutter">
                    <div className="one-quarter">
                        <Link to="/project/1" className="indexPage-link">
                            Test project
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
};
