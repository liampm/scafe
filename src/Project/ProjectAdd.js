import React from 'react';

export default class ProjectAdd extends React.Component {
    state = {
        name: undefined,
        projectId: undefined,
        targets: [
            {name:'test', config:{type:'git-repo', details:{username:'dom111', url:'git@github.com:dom111/dotfiles.git', token:'token' } }}
        ],
        tasks: []
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
                    <input id="project__name" type="text"  minLength={3 } className="validate"/>
                    <label htmlFor="project__name">Project Name</label>
                </div>

                <ul className="collection with-header" id="project__targets">
                    <li className="collection-header">
                        <h5>Targets</h5>
                    </li>
                    {this.state.targets.map((target, i) => (
                        <li className="card collection-item" key={`project__target_name--${i}`}>
                            <div data-target={JSON.stringify(target)}>
                                {target.name} &nbsp;
                                <em style={{color: '#aaa'}}>
                                    {target.config.type} -
                                    {target.config.details.url}
                                </em>

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

                <div className="card" id="target_input" style={{color: '#aaa', padding: '10px'}}>
                    <div>
                        <select className="browser-default" id="project__target__config__type" defaultValue="git-repo">
                            <option  value="">Target Type</option>
                            <option  value="git-repo">Git Repo</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <input
                            id="project__target__name"
                            name="targetName"
                            type="text"
                            className="validate"
                            
                            minLength={3}

                        />
                        <label htmlFor="project__target__name">Target Name</label>
                    </div>
                    <div className="input-field">
                        <input
                            id="project__target__config__username"
                            name="targetUsername"
                            type="text"
                            className="validate"
                            
                        />
                        <label htmlFor="project__target__config__username">Target Username</label>
                    </div>
                    <div className="input-field">
                        <input
                            id="project__target__config__url"
                            name="targetUrl"
                            type="text"
                            className="validate"
                            
                        />
                        <label htmlFor="project__target__config__url">Target URL</label>
                    </div>
                    <div className="input-field">
                        <input
                            id="project__target__config__token"
                            name="targetToken"
                            type="text"
                            className="validate"
                            

                            // onBlur={(e) => {
                            //     e.currentTarget.removeAttribute('');
                            //     this.saveTarget();
                            // }}
                            // onFocus={(e) => e.currentTarget.setAttribute('', '')}
                        />
                        <label htmlFor="project__target__config__token">Target Token</label>
                    </div>
                    <button className="btn waves-effect waves-light"
                            onClick={(e) => {
                                e.preventDefault();
                                this.saveTarget();
                            }}>
                        Add Task
                    </button>
                </div>

                <ul className="collection with-header" id="project__jobs">
                    <li className="collection-header">
                        <h5>Tasks</h5>
                    </li>
                    {this.state.tasks.map((task, i) => (
                        <li className="collection-item" key={`project__job--${i}`}>
                            <div data-task={task}>
                                {task}
                                <a href="#!/project/task/delete" className="secondary-content" onClick={(e) => {
                                    e.preventDefault();
                                    this.removeTask(e.currentTarget.parentNode);
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
                        
                        minLength={3}
                        onKeyPress={(e) => {
                           if (e.which === 13) {
                               e.preventDefault();

                               this.saveTask(e.currentTarget);
                           }
                        }}
                        onBlur={(e) => {
                            e.currentTarget.removeAttribute('required');
                            this.saveTask(e.currentTarget);
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

    saveTarget() {
        // {name:'test', config:{type:'', details:{username:'', url:'', token:'' } }}
        let inputs = {
            name: document.getElementById("project__target__name"),
            type: document.getElementById("project__target__config__type"),
            username: document.getElementById("project__target__config__username"),
            url: document.getElementById("project__target__config__url"),
            token: document.getElementById("project__target__config__token")
        };

        let selectedType = inputs.type.options[inputs.type.selectedIndex].value;


        let target = {
            name: inputs.name.value,
            config: {
                type: selectedType,
                details: {
                    username: inputs.username.value,
                    url: inputs.url.value,
                    token: inputs.token.value
                }
            }
        };
        console.log(target);
        inputs.name.setCustomValidity('');

        if (inputs.name.willValidate && ! inputs.name.checkValidity()) {
            return;
        }
        if (inputs.type.willValidate && !inputs.type.checkValidity()) {
            return;
        }
        if (inputs.username.willValidate && !inputs.username.checkValidity()) {
            return;
        }
        if (inputs.url.willValidate && !inputs.url.checkValidity()) {
            return;
        }
        if (inputs.token.willValidate && !inputs.token.checkValidity()) {
            return;
        }

        this.setState((state) => {
            if (state.targets.includes(target.name)) {
                inputs.name.setCustomValidity('The target already exists.');
                return state;
            }

            inputs.name.value = '';
            inputs.type.value = '';
            inputs.username.value = '';
            inputs.url.value = '';
            inputs.token.value = '';

            return {
                targets: state.targets.concat([target])
            };
        });
    }

    removeTarget(targetElement) {
        this.setState((state) => ({
            targets: state.targets.filter((target) => JSON.stringify(target) !== targetElement.getAttribute('data-target'))
        }))
    }

    saveTask(input) {
        let task = input.value;
        input.setCustomValidity('');

        if (input.willValidate && ! input.checkValidity()) {
            return;
        }

        this.setState((state) => {
            if (state.tasks.includes(task)) {
                input.setCustomValidity('The task already exists.');

                return state;
            }

            input.value = '';

            return {
                tasks: state.tasks.concat([task])
            };
        });
    }

    removeTask(targetElement) {
        this.setState((state) => ({
            tasks: state.tasks.filter((task) => task !== targetElement.getAttribute('data-task'))
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
        let tasks = Array.from(jobElements || []).map((jobElement) => jobElement.getAttribute('data-task'));

        let project = {
            name,
            targets,
            tasks
        };

        // call API
        console.log(project);

        fetch('http://localhost:7890/project', {
            method: 'POST',
            // mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name
            }),

        })
            .then((response) => response.json())

            .then((project) => {
                this.state.targets.forEach((target) => {

                    fetch( `http://localhost:7890/project/${project.id}/target`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(target),
                    } )
                })
                    .then(() => {
                        this.state.tasks.forEach((task) => {
                            fetch(`http://localhost:7890/project/${project.id}/task`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(task),
                            })
                        })
                    })
        });
    }
}