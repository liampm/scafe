import React from 'react';
import Nav from './Nav/Nav';
import Project from './Project/Project';
import ProjectList from './Project/ProjectList';
import ProjectAdd from './Project/ProjectAdd';
import {
    Route,
    BrowserRouter as Router
} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <article className="App">
                <Nav />
                <article className="pageContent">
                    <Route exact path="/" component={ProjectList}/>
                    <Route exact path="/projects" component={ProjectList}/>
                    <Route exact path="/projects/add" component={ProjectAdd}/>
                    <Route path="/project/:id" component={Project}/>
                </article>
            </article>
        </Router>
    );
}
