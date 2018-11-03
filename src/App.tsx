import React, { Component } from 'react';
import { Grid, Navbar, Glyphicon, Row, Col, Nav, NavItem, Panel } from 'react-bootstrap';

 import './App.css';
import { AudioFactory } from './models/factory';
import Visualizer from './visualizer/visualizer';

class App extends Component {
  private track: AudioFactory;
  private canvasContext?: CanvasRenderingContext2D;
  private drawHandle?: number;

  constructor(props: any) {
    super(props);
    this.track = new AudioFactory();
  }

  public play = () => {
    if (this.track.isOn) {
      this.track.end();
      if (this.drawHandle) {
        cancelAnimationFrame(this.drawHandle);
      }
      return;
    }
    this.track.start();
    if (this.canvasContext) {
      this.visualize();
    }
  }

  connectVisualizer = (ctx: CanvasRenderingContext2D) => {
    this.canvasContext = ctx;
  }

  visualize = () => {
    if (this.canvasContext) {
      this.drawHandle = requestAnimationFrame(this.visualize);
      const WIDTH = this.canvasContext.canvas.width;
      const HEIGHT = this.canvasContext.canvas.height;
      const data = this.track.getAnalyserData();
      this.canvasContext.fillStyle = "rgb(255, 255, 255)";
      this.canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
      this.canvasContext.lineWidth = 1;
      this.canvasContext.strokeStyle = 'rgb(0, 0, 0)';
      this.canvasContext.beginPath();
      const sliceWidth = WIDTH * 1.0 / data.length;
      let x = 0;
      for(var i = 0; i < data.length; i++) {

        var v = data[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          this.canvasContext.moveTo(x, y);
        } else {
          this.canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
      }

      this.canvasContext.lineTo(WIDTH, HEIGHT/2);
      this.canvasContext.stroke();
    }
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
              <Visualizer onMount={this.connectVisualizer} />
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
