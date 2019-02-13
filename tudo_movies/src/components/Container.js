import React, { Component } from 'react';
import '../css/Container.css';
import Pubsub from 'pubsub-js';
import Card from './Card'

import axios from 'axios';

export default class Container extends Component {

    //https://api.themoviedb.org/3/search/movie?query=${velozes%20e%20furiosos}&api_key=7fa47550a2cf9a4e94701d5e5940ce12&languagem=pt-BR
   
    state = {
        movies: [],
        page: 1,
        search: false
    }
    componentDidMount() {    
        this.handleScroll();
        window.onscroll = () => this.handleScroll();
    }

    componentWillMount(){
        Pubsub.subscribe('searchedMovie', (topic, movies) => {
            this.setState({                
                movies
            })
        })
    }

    handleScroll = (e) => {
       
        if (window.pageYOffset + window.innerHeight >= document.body.offsetHeight - 400) {

            const { page } = this.state;
            const API_KEY = '7fa47550a2cf9a4e94701d5e5940ce12';
            axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&language=pt-BR&page=' + page)
            .then(response => {
                const movies = response.data.results;
                this.setState({
                    movies: [...this.state.movies, ...movies],
                    page: page + 1,
                });
                
            });
            
        }
       
    }

    render() {
            return (
                <div className="content">
                    <h2 className="title">Recentes</h2>

                    {this.state.movies.map(movie => (
                        <Card key={movie.id} movie={movie} />
                    ))}

                </div>
            );
        }
    }
