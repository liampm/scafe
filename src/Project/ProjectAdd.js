import React from 'react';

export default class ProjectAdd extends React.Component {
    state = {
        name: undefined,
        targets: [],
        jobs: []
    };

    render() {
        return (
            <form className="projectAddForm" onSubmit={this.save.bind(this)}>
                <div className="row">
                    <header>
                        <h3>Add Project</h3>
                    </header>
                </div>

                <div className="input-field">
                    <input id="project__name" type="text" required minLength={3 } className="validate"/>
                    <label htmlFor="project__name">Project Name</label>
                </div>

                <ul className="collection with-header" id="project__targets">
                    <li className="collection-header">
                        <h5>Targets</h5>
                    </li>
                    {this.state.targets.map((target, i) => (
                        <li className="collection-item" key={`project__target--${i}`}>
                            <div data-target={target}>
                                {target}
                                <a href="#!/project/target/delete" className="secondary-content" onClick={(e) => {
                                    e.preventDefault();
                                    this.removeTarget(e.currentTarget.parentNode);
                                }}>
                                    <i className="material-icons">delete</i>
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="input-field">
                    <input
                        id="project__target"
                        type="text"
                        className="validate"
                        required
                        minLength={3}
                        onKeyPress={(e) => {
                           if (e.which === 13) {
                               e.preventDefault();

                               this.saveTarget(e.target);
                           }
                        }}
                        onBlur={(e) => {
                            e.currentTarget.removeAttribute('required');
                            this.saveTarget(e.currentTarget);
                        }}
                        onFocus={(e) => e.currentTarget.setAttribute('required', '')}
                    />
                    <label htmlFor="project__target">Target</label>
                </div>

                <ul className="collection with-header" id="project__jobs">
                    <li className="collection-header">
                        <h5>Jobs</h5>
                    </li>
                    {this.state.jobs.map((job, i) => (
                        <li className="collection-item" key={`project__job--${i}`}>
                            <div data-job={job}>
                                {job}
                                <a href="#!/project/job/delete" className="secondary-content" onClick={(e) => {
                                    e.preventDefault();
                                    this.removeJob(e.currentTarget.parentNode);
                                }}>
                                    <i className="material-icons">delete</i>
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="input-field">
                    <input
                        id="project__job"
                        type="text"
                        className="validate"
                        required
                        minLength={3}
                        onKeyPress={(e) => {
                           if (e.which === 13) {
                               e.preventDefault();

                               this.saveJob(e.currentTarget);
                           }
                        }}
                        onBlur={(e) => {
                            e.currentTarget.removeAttribute('required');
                            this.saveJob(e.currentTarget);
                        }}
                        onFocus={(e) => e.currentTarget.setAttribute('required', '')}
                    />
                    <label htmlFor="project__job">Job</label>
                </div>

                <div className="input-field">
                    <button className="btn waves-effect waves-light" type="submit" name="action">
                        Save
                    </button>
                </div>
            </form>
        );
    }

    saveTarget(input) {
        let target = input.value;

        input.setCustomValidity('');

        if (input.willValidate && ! input.checkValidity()) {
            return;
        }

        this.setState((state) => {
            if (state.targets.includes(target)) {
                input.setCustomValidity('The target already exists.');

                return state;
            }

            input.value = '';

            return {
                targets: state.targets.concat([target])
            };
        });
    }

    removeTarget(targetElement) {
        this.setState((state) => ({
            targets: state.targets.filter((target) => target !== targetElement.getAttribute('data-target'))
        }))
    }

    saveJob(input) {
        let jon = input.value;

        input.setCustomValidity('');

        if (input.willValidate && ! input.checkValidity()) {
            return;
        }

        this.setState((state) => {
            if (state.jobs.includes(jon)) {
                input.setCustomValidity('The job already exists.');

                return state;
            }

            input.value = '';

            return {
                jobs: state.jobs.concat([jon])
            };
        });
    }

    removeJob(targetElement) {
        this.setState((state) => ({
            jobs: state.jobs.filter((jon) => jon !== targetElement.getAttribute('data-job'))
        }))
    }

    componentDidMount() {
        // if edit, get data
    }

    save() {
        let name = (document.getElementById('project__name') || {}).value;
        let targetElements = document.querySelectorAll('#project__targets li > div');
        let targets = Array.from(targetElements || []).map((targetElement) => targetElement.getAttribute('data-target'));
        let jobElements = document.getElementById('project__jobs');
        let jobs = Array.from(jobElements || []).map((jobElement) => jobElement.getAttribute('data-job'));

        let project = {
            name,
            targets,
            jobs
        };

        // call API
        console.log(project);
    }
}