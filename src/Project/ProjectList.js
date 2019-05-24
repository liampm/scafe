import React from 'react';
import { Link } from "react-router-dom";

export default class ProjectList extends React.Component {
    state = {
        projects: []
    };

    render() {
        return (
            <article className="card">
                <div className="collection with-header projectList">
                    <div className="collection-header">
                        <Link to="/projects/add" className="btn-floating btn-large waves-effect waves-light red right"><i className="material-icons">add</i></Link>
                        <h4>Projects</h4>
                    </div>
                    {
                        (this.state.projects.length) ?
                            this.state.projects.map((project) => (
                                <Link className="collection-item" key={project.id} to={`/project/${project.id}`}>{project.name}</Link>
                            )) :
                            <div className="collection-item">
                                There are currently no projects
                            </div>
                    }
                </div>
            </article>
        );
    }

    componentWillMount() {
        fetch('http://localhost:7890/project', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((projects) => this.setState(() => ({
                projects: projects
            })))
        ;
    }
}