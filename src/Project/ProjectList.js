import React from 'react';

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
                        <a href="#!/project/add" className="btn-floating btn-large waves-effect waves-light red right"><i className="material-icons">add</i></a>
                        <h4>Projects</h4>
                    </div>
                    {this.state.projects.map((project) => <a className="collection-item" key={project.id} href={`#!/project/${project.id}`}>{project.name}</a>)}
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