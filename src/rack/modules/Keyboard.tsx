import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './Keyboard.css';

import { IMidiKeyboard } from '../../models/base';
import { ID, MidiKeysState, DataCallback } from '../../models/types';
import { getModule } from '../../store/instruments/selectors';
import IState from '../../store/state';
import { MIDINoteIndex } from '../../utils/midi';
import { keyboardKeyDownAction, keyboardKeyUpAction } from '../../store/instruments/actions/keyboard';

// svg relative with of keys
export const whiteKeyWidth = 7;
export const blackKeyWidth = 4;
// offset for drawing the keys
const keysOffset = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
// keyboard to keys characters binding
export const octaveChars = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'z', 'h', 'u', 'j', 'k', 'o', 'l', 'p', 'ö'];

export interface OwnProps {
  id: ID;
  className?: string;
}

export interface Props extends OwnProps {
  keys: MidiKeysState;
  start: number;
  end: number;
  onDown: DataCallback<number>;
  onUp: DataCallback<number>;
}

export class Keyboard extends React.Component<Props> {

  private mouseDown = false;

  renderBlackKey = (midi: number) => {
    const { keys, start } = this.props;
    const i = midi % 12;
    const octave = Math.floor((midi - start) / 12)
    const offset = octave * 7 + keysOffset[i];
    const x = (offset + 1) * whiteKeyWidth - (blackKeyWidth / 2);
    const isPressed = !!keys[midi];
    const keyFill = isPressed ? 'url(#black-pressed)' : 'url(#black)';
    return (
      <rect
        key={midi}
        onMouseDown={this.onDown}
        onMouseUp={this.onUp}
        onMouseEnter={this.onEnter}
        onMouseLeave={this.onLeave}
        data-note={midi}
        x={x}
        y="0"
        width={blackKeyWidth}
        height="60"
        stroke="#000"
        fill={keyFill}
        strokeWidth="0.1"/>
    )
  }

  renderWhiteKey = (midi: number) => {
    const { keys, start } = this.props;
    const i = midi % 12;
    const octave = Math.floor((midi - start) / 12)
    const offset = octave * 7 + keysOffset[i];
    const x = offset * whiteKeyWidth;
    const isPressed = !!keys[midi];
    const keyFill = isPressed ? 'url(#white-pressed)' : 'url(#white)';
    return (
      <rect
        key={midi}
        onMouseDown={this.onDown}
        onMouseUp={this.onUp}
        onMouseEnter={this.onEnter}
        onMouseLeave={this.onLeave}
        data-note={midi}
        x={x}
        y="0"
        width={whiteKeyWidth}
        height="100"
        stroke="#000"
        fill={keyFill}
        strokeWidth="0.1"/>
    );
  }

  onUp = (e: React.MouseEvent<SVGRectElement>) => {
    const note = (e.target as SVGRectElement).dataset.note;
    if (note) {
      this.mouseDown = false;
      this.props.onUp(parseInt(note, 10));
    }
  }

  onDown = (e: React.MouseEvent<SVGRectElement>) => {
    const note = (e.target as SVGRectElement).dataset.note;
    if (note) {
      this.mouseDown = true;
      this.props.onDown(parseInt(note, 10));
    }
  }

  onEnter = (e: React.MouseEvent<SVGRectElement>) => {
    const note = (e.target as SVGRectElement).dataset.note;
    if (note && this.mouseDown) {
      this.props.onDown(parseInt(note, 10));
    }
  }

  onLeave = (e: React.MouseEvent<SVGRectElement>) => {
    const note = (e.target as SVGRectElement).dataset.note;
    if (note && this.mouseDown) {
      this.props.onUp(parseInt(note, 10));
    }
  }

  keyDownHandler = (e: KeyboardEvent) => {
    // check if key is mapped
    const key = e.key;
    const keyNum = octaveChars.indexOf(key);
    if (keyNum < 0) {
      return;
    }
    // check if key is already pressed
    const { start, keys } = this.props;
    const midi = start + keyNum;
    const isPressed = !!keys[midi];
    if (isPressed) {
      return;
    }
    this.props.onDown(midi);
  }

  keyUpHandler = (e: KeyboardEvent) => {
    const key = e.key;
    const keyNum = octaveChars.indexOf(key);
    if (keyNum < 0) {
      return;
    }
    const note = this.props.start + keyNum;
    this.props.onUp(note);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  render() {
    const { className, start, end } = this.props;
    let whiteKeys = [];
    let blackKeys = [];
    for (let index = start; index < end + 1; index++) {
      const note = MIDINoteIndex[index];
      switch (note.type) {
        case 'white': {
          whiteKeys.push(this.renderWhiteKey(index));
          break;
        }
        default: {
          blackKeys.push(this.renderBlackKey(index));
          break;
        }
      }
    }
    // viewbox should be dynamic to be able to add more keys in the future
    const viewBox = `0 0 ${whiteKeys.length * whiteKeyWidth} 100`;
    return (
      <div className={'keyboard control ' + (className || '')}>
        <svg
          viewBox={viewBox}
          preserveAspectRatio="none"
          width="100%" height="100%">
          <linearGradient id="white" x1="0" x2="0" y1="0" y2="1">
            <stop id="stop1" stopColor="#ffffff" offset="0%" />
            <stop id="stop2" stopColor="#e0e0e0" offset="100%" />
          </linearGradient>
          <linearGradient id="white-pressed" x1="0" x2="0" y1="0" y2="1">
            <stop id="stop1" stopColor="#e0e0e0" offset="0%" />
            <stop id="stop2" stopColor="#d1d1d1" offset="100%" />
          </linearGradient>
          <linearGradient id="black" x1="0" x2="0" y1="0" y2="1">
            <stop id="stop1" stopColor="#3f3f3f" offset="0%" />
            <stop id="stop2" stopColor="#000000" offset="100%" />
          </linearGradient>
          <linearGradient id="black-pressed" x1="0" x2="0" y1="0" y2="1">
            <stop id="stop1" stopColor="#414141" offset="0%" />
            <stop id="stop2" stopColor="#3f3f3f" offset="100%" />
          </linearGradient>
          {whiteKeys}
          {blackKeys}
        </svg>
      </div>
    );
  }
}

export const mapStateToProps = (state: IState, ownProps: OwnProps) => {
  const id = ownProps.id;
  const keyboard = getModule(state, id) as IMidiKeyboard;
  const { start, end, keys } = keyboard;
  return {
    keys,
    start,
    end,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const { id } = ownProps;
  return {
    onDown: (midi: number) => dispatch(keyboardKeyDownAction(id, midi)),
    onUp: (midi: number) => dispatch(keyboardKeyUpAction(id, midi)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);
