import React, { Component } from 'react';
import '../css/Container.css';
import Pubsub from 'pubsub-js';
import Card from './Card'

import axios from 'axios';

export default class Container extends Component {

    state = {
        movies: [],
        total_results: 0,
        total_pages: 1,
        page: 1,
        search: ''
    }

    componentDidMount() {
        this.handleScroll();
        window.onscroll = () => this.handleScroll();
    }

    componentWillMount() {
        Pubsub.subscribe('searchedMovieResult', (topic, search) => {
            this.setState({
                movies: [],
                page: 1,
                search
            })
            this.loadData();
        })
    }

    handleScroll = (e) => {
        if (window.pageYOffset + window.innerHeight >= document.body.offsetHeight - 400) {
            this.loadData();
        }
    }

    loadData = () => {
        
        const API_KEY = '7fa47550a2cf9a4e94701d5e5940ce12';
        let { page } = this.state;
        let { total_pages } = this.state;
        let { search } = this.state;

        let url = 'https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&language=pt-BR&page=' + page;

        if (search) {
            url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&language=en-US&query=' + search + '&page=' + page;
        }
        
        if (page <= total_pages) {
            axios.get(url)
                .then(response => {
                    let movies = response.data;                    
                    this.setState({
                        movies: [...this.state.movies, ...movies.results],
                        total_results: movies.total_results,
                        total_pages: movies.total_pages,
                        page: page + 1
                    });

                });            
        }
    }

    render() {

        let { search } = this.state;
        let { total_results } = this.state;
        let title = 'Recentes';

        if (search) {
            title = total_results + ' resultado(s) para: ' + search;
        }
        return (
            <div className="content">
                <h2 className="title">{title}</h2>

                {this.state.movies.map(movie => (
                    <Card key={movie.id} movie={movie} />
                ))}

            </div>
        );
    }
}
