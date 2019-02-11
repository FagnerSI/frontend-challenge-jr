import React, { Component } from 'react';
import './Container.css';

import Card from './Card'

import axios from 'axios';

export default class Container extends Component {
    
    state = {
        movies: []
    }

   componentDidMount() {
        const myKey = '7fa47550a2cf9a4e94701d5e5940ce12';

        axios.get('https://api.themoviedb.org/3/movie/popular?api_key='+myKey+'&language=pt-BR&page=1')
            .then(response => {
                const movies = response.data.results;
                console.log(movies)
                this.setState({ movies });
            });
    }

    render() {
        return (
            <div className="content">
                <h2 className="title">Recentes</h2>

                {this.state.movies.map( movie => (
                    <Card key={ movie.id } movie={ movie }/>
                ))}
                
            </div>
        );
    }
}
