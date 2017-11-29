import React from 'react';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends React.Component {
    render() {
        return (
            <div className="breadcrumb">
                {this.props.routes.map((route, id) =>
                    <span className="breadcrumb-item" key={id}>
                        {route.link ?
                            <Link to={route.link}>{route.label}</Link> : route.label
                        }
                    </span>
                )}
            </div>
        );
    }
};
