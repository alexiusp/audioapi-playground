import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, Navbar, Glyphicon, Row, Col, Nav, NavItem, Panel } from 'react-bootstrap';
import { AudioFactory } from './models/factory';

class App extends Component {
  private track: AudioFactory;
  constructor(props: any) {
    super(props);
    this.track = new AudioFactory();
  }
  public play = () => {
    if (this.track.isOn) {
      this.track.end();
      return;
    }
    this.track.start();
  }
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
        <Row>
          <Col sm={12}>
            <Panel>
              synths
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Panel>
              <div className="App">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
            </Panel>
          </Col>
        </Row>
        <Navbar fixedBottom={true}>
          <Nav bsStyle="pills">
            <NavItem onClick={this.play}><Glyphicon glyph="play" /></NavItem>
          </Nav>
        </Navbar>
      </Grid>
    );
  }
}

export default App;
