import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID } from '../../models/base';
import { getMidiKeyboard } from '../../store/instruments/selectors';
import IState from '../../store/state';
import { MIDINoteIndex } from '../../utils/midi';

import { whiteKeyWidth } from './constants';
import WhiteKey from './whiteKey';
import BlackKey from './blackKey';

import './keyboard.css';

export interface OwnProps {
  id: ID;
  className?: string;
}

export interface Props extends OwnProps {
  start: number;
  end: number;
}

// offset for drawing the keys
const keysOffset = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];

export function Keyboard(props: Props) {
  const { className, id, start, end } = props;
  let whiteKeys = [];
  let blackKeys = [];
  for (let index = start; index < end + 1; index++) {
    const note = MIDINoteIndex[index];
    const i = index % 12;
    const octave = Math.floor((index - start) / 12)
    const offset = octave * 7 + keysOffset[i];
    switch (note.type) {
      case 'white': {
        const key = whiteKeys.length;
        whiteKeys.push(
          <WhiteKey id={id} i={offset} key={key} midi={index} />
        );
        break;
      }
      default: {
        const key = blackKeys.length;
        blackKeys.push(
          <BlackKey id={id} i={offset} key={key} midi={index} />
        );
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

export const mapStateToProps = (state: IState, ownProps: OwnProps) => {
  const id = ownProps.id;
  const { start, end } = getMidiKeyboard(state, id);
  return {
    start,
    end,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);
