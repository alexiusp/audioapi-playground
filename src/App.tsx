import React, { Component } from 'react';
import { Grid, Navbar, Glyphicon, Row, Col, Nav, NavItem, Panel } from 'react-bootstrap';

import './App.css';
import RackUI from './rack/rack';
import MasterMixerUI from './master/masterMixer';
import { InstrumentsRack } from './models/instrumentsRack';

class App extends Component {
  private rack: InstrumentsRack;

  constructor(props: any) {
    super(props);
    this.rack = new InstrumentsRack();
    this.rack.initDefault();
  }

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
            <RackUI rack={this.rack} />
          </Col>
        </Row>
        <MasterMixerUI master={this.rack.master} />
      </Grid>
    );
  }
}

export default App;
