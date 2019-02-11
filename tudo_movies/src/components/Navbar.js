import React, { Component } from 'react';
import './Navbar.css';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <h1 className="logo">TUDOMovies</h1>
                <div className="float-right">
                    <input className="field-search" type="search" placeholder="Buscar filmes..." />
                </div>
            </nav>
        );
    }
}
