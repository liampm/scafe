import React from 'react';
import { Link } from "react-router-dom";

export default class Project extends React.Component {
    state = {
        id: undefined,
        project: {},
        targets: [],
        jobs: [],
        tasks: []
    };

    constructor(props, context) {
        super(props, context);
        this.state.id = props.match.params.id;
    }

    render() {
        return (
            <div className="project">
                <h1>{this.state.project.name}</h1>
                <ul className="targets collection with-header">
                    <li className="collection-header">
                        <h4>Targets</h4>
                    </li>
                    {this.state.targets.map((target) => (
                        <li key={target.id} className="collection-item target">{target.name}</li>
                    ))}
                </ul>

                <ul className="tasks collection with-header">
                    <li className="collection-header">
                        <h4>Tasks</h4>
                    </li>
                    {this.state.tasks.map((task) => (
                        <li key={task.id} className="collection-item task">{task.name}</li>
                    ))}
                </ul>

                <ul className="jobs collection with-header">
                    <li className="collection-header">
                        <h4>Jobs</h4>
                    </li>
                    {this.state.jobs.map((job) => (
                        <li key={job.id} className="collection-item job">
                            {job.status || 'pending'}
                            {/*<Link to={`/project/${this.state}/job/${job.id}/analyse`} className="waves-effect waves-light right btn">*/}
                            {/*    <i class="material-icons left">insert_chart</i>*/}
                            {/*    Analyse*/}
                            {/*</Link>*/}
                        </li>
                    ))}
                </ul>

                <div className="input-container">
                    <Link to={`/project/${this.state.id}/job`} className="waves-effect waves-light btn"
                          onClick={(e) => {
                              e.preventDefault();
                              this.runJob(e.currentTarget);
                          }}
                    >
                        <i className="material-icons left">insert_chart</i>
                        Analyse
                    </Link>
                </div>
            </div>
        );
    }

    componentWillMount() {
        [
            {
                url: `http://localhost:7890/project/${this.state.id}`,
                success: (project) => this.setState(() => ({
                    project: project
                }))
            },
            {
                url: `http://localhost:7890/project/${this.state.id}/task`,
                success: (tasks) => this.setState(() => ({
                    tasks: tasks
                }))
            },
            {
                url: `http://localhost:7890/project/${this.state.id}/target`,
                success: (targets) => this.setState(() => ({
                    targets: targets
                }))
            },
            {
                url: `http://localhost:7890/project/${this.state.id}/job`,
                success: (jobs) => this.setState(() => ({
                    jobs: jobs
                }))
            }
        ].forEach((config) => {
            fetch(config.url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then(config.success)
            ;
        });
    }

    runJob(element) {
        element.classList.add('disabled', 'pulse');

        fetch(`http://localhost:7890/project/${this.state.id}/job`, {
            method: 'POST',
            body: JSON.stringify({
                projectId: this.state.id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                // would be nice to show progress here, remove the button (since analysis is queued) and then update
                // (perhaps we need to poll?) with a link to the analysis when complete
                fetch(`http://localhost:7890/project/${this.state.id}/job`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => response.json())
                    .then((jobs) => this.setState(() => ({
                        jobs: jobs
                    })))
                ;
            })
        ;
    }
}