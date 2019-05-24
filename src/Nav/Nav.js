import React from 'react';
import Search from './Search';
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="blue">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo"> &nbsp; SCAT</Link>
                <ul className="right hide-on-med-and-down">
                    <Search/>
                </ul>
            </div>
        </nav>
    );
}