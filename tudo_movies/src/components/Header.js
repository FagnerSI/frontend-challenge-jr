import React, { Component } from 'react';
import Pubsub from 'pubsub-js';
import '../css/Header.css';

import axios from 'axios';
export default class Header extends Component {


    search(event) {
        event.preventDefault();
        
        const API_KEY = '7fa47550a2cf9a4e94701d5e5940ce12';
        axios.get('https://api.themoviedb.org/3/search/movie?query=${'+this.searchedMovies.value+'}&api_key=' + API_KEY + '&language=pt-BR')
        .then(response => {
            let movies = response.data.results;
            Pubsub.publish('searchedMovie', movies);
        });       
    }    

    render() {
        return (
            <header className="header">
                <h1 className="logo">TUDOMovies</h1>
                <form className="float-right" onSubmit={this.search.bind(this)}>
                    <input className="field-search" type="search" placeholder="Buscar filmes..." ref={input => this.searchedMovies = input} />
                </form>
            </header >
        );
    }
}
