import * as React from 'react';

import { DataCallback } from '../models/types';

export interface CanvasProps {
  onMount: DataCallback<CanvasRenderingContext2D>;
};

export default class Visualizer extends React.Component<CanvasProps, {}> {
  private canvas: React.RefObject<HTMLCanvasElement>;

  constructor(props: CanvasProps) {
    super(props);
    this.canvas = React.createRef();
  }

  public componentDidMount() {
    const canvas = this.canvas.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.props.onMount(ctx);
        return;
      }
    }
    throw new Error('can not get rendering context!');
  }

  render() {
    return (
      <div id="visualizer-wrapper">
        <canvas id="visualizer" ref={this.canvas} />
      </div>
    );
  }
}
