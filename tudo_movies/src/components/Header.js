import React, { Component } from 'react';
import Pubsub from 'pubsub-js';
import '../css/Header.css';

export default class Header extends Component {


    handleSearch(event) {
        event.preventDefault();
        let search = this.searchedMovies.value;

        Pubsub.publish('searchedMovieResult', search);

    }

    render() {
        return (
            <header className="header">
                <a href="/">
                    <h1 className="logo">TUDOMovies</h1>
                </a>
                <form className="float-right" onSubmit={this.handleSearch.bind(this)}>
                    <input className="field-search" type="search" placeholder="Buscar filmes..." ref={input => this.searchedMovies = input} />
                </form>
            </header >
        );
    }
}
