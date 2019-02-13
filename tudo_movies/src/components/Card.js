import React, { Component } from 'react';
import '../css/Card.css';


import axios from 'axios';

export default class Card extends Component {


  state = {
    movie: ''
  }

  componentDidMount() {
    const { movie } = this.props;
    const API_KEY = '7fa47550a2cf9a4e94701d5e5940ce12';


    axios.get('https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=' + API_KEY + '&language=pt-BR')
      .then(response => {
        const movie = response.data;
        this.setState({ movie });
      });
  }

  render() {

    const { movie } = this.state;
    const base_url = 'https://image.tmdb.org/t/p/';
    const size = 'w780';

    let classRanger = 'movie-rating float-right';

    if (movie.vote_average >= 8) {
      classRanger += ' ranger-green';
    }

    else if (movie.vote_average < 8 && movie.vote_average >= 5) {
      classRanger += ' ranger-orange';
    }

    else {
      classRanger += ' ranger-red';
    }
    

    return (
      <div className="card" >
        <img className="img-back" src={base_url + size + movie.backdrop_path} alt={'Imagem do filme: '+ movie.title}/>

        <img className="img-min" src={base_url + size + movie.poster_path} alt={'Poster do filme: '+ movie.title}/>

        <div className="card-body">

          <div className={classRanger}>{movie.vote_average}</div>
          <h3 className="movie-title"> {movie.title} </h3>
          <p className="movie-desc">{movie.tagline}</p>
          <span className="movie-date">
            {movie.release_date}
          </span>
          
        </div>
      </div>

    );
  }

}


