import React, { Component } from 'react';

import Navbar from './components/Navbar';
import Container from './components/Container';

//import api from './services/api';

class App extends Component {
  render() {
    return ( 
      <div>     
        <Navbar/>
        <Container /> 
      </div>    
    );
  }
}

export default App;