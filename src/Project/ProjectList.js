import React from 'react';
import { Link } from "react-router-dom";

export default class ProjectList extends React.Component {
    state = {
        // TODO: remove
        projects: [
            // {
            //     id: '1',
            //     name: 'Test Project 1'
            // },
            // {
            //     id: '2',
            //     name: 'Test Project 2'
            // },
            // {
            //     id: '3',
            //     name: 'Test Project 3'
            // },
            // {
            //     id: '4',
            //     name: 'Test Project 4'
            // }
        ]
    };

    render() {
        return (
            <article className="card">
                <div className="collection with-header projectList">
                    <div className="collection-header">
                        <Link to="/projects/add" className="btn-floating btn-large waves-effect waves-light red right"><i className="material-icons">add</i></Link>
                        <h4>Projects</h4>
                    </div>
                    {this.state.projects.map((project) => <Link className="collection-item" key={project.id} to={`/project/${project.id}`}>{project.name}</Link>)}
                </div>
            </article>
        );
    }

    componentWillMount() {
        fetch('http://localhost:7890/project', {
            method: 'GET',
            // mode: 'cors',
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