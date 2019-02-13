import React, { Component } from 'react';

import Header from './components/Header';
import Container from './components/Container';

//import api from './services/api';

class App extends Component {
  render() {
    return ( 
      <div>     
        <Header />
        <Container /> 
      </div>    
    );
  }
}

export default App;