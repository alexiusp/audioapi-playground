import React, { Component } from 'react';
import { Grid, Navbar, Glyphicon, Row, Col, Nav, NavItem, Panel } from 'react-bootstrap';

import './App.css';
import RackUI from './rack/rack';
import MasterMixerUI from './master/masterMixer';

class App extends Component {
  render() {
    return (
      <Grid fluid={true}>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Glyphicon glyph="music" />
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Row>
          <Col sm={12}>
            <RackUI />
          </Col>
        </Row>
        <MasterMixerUI />
      </Grid>
    );
  }
}

export default App;
