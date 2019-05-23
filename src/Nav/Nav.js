import React from 'react';
import Search from './Search';

export default function Nav() {
    return (
        <nav className="blue">
            <div className="nav-wrapper">
                <a href="#!" className="brand-logo"> &nbsp; SCAT</a>
                <ul className="right hide-on-med-and-down">
                    <Search/>
                    <li><a href="badges.html"><i className="material-icons">view_module</i></a></li>
                    <li><a href="collapsible.html"><i className="material-icons">refresh</i></a></li>
                    <li><a href="mobile.html"><i className="material-icons">more_vert</i></a></li>
                </ul>
            </div>
        </nav>
    );
}