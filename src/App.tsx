import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Navbar, Glyphicon } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid fluid={true}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Glyphicon glyph="music" />
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>

        <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </Grid>
    );
  }
}

export default App;
