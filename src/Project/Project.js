import React from 'react';

export default class Project extends React.Component {
    state = {
        // TODO: remove this test data
        name: 'Test Project 1',
        targets: [
            {
                name: 'Test Target 1'
            },
            {
                name: 'Test Target 2'
            }
        ],
        jobs: [
            {
                name: 'Test Job 1'
            },
            {
                name: 'Test Job 2'
            },
            {
                name: 'Test Job 3'
            }
        ]
    };

    render() {
        return (
            <div className="project">
                <header>{this.state.name}</header>
                <ul className="targets">
                    {this.state.targets.map((target) => <li className="target">{target.name}</li>)}
                </ul>
                <ul className="jobs">
                    {this.state.jobs.map((job) => <li className="job">{job.name}</li>)}
                </ul>
            </div>
        );
    }

    componentWillMount(props) {
        console.log(props);
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