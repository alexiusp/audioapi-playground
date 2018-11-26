import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Callback, ID } from '../../../models/types';
import { whiteKeyWidth, blackKeyWidth } from './constants';
import { keyboardKeyDownAction, keyboardKeyUpAction } from '../../../store/instruments/actions/keyboard';
import IState from '../../../store/state';
import { getModule } from '../../../store/instruments/selectors';
import { IMidiKeyboard } from '../../../models/base';

export interface OwnProps {
  // instrument id
  id: ID;
  // key index
  i: number;
  // corresponding midi note number
  midi: number
}

export interface Props extends OwnProps {
  isPressed: boolean;
  onDown: Callback;
  onUp: Callback;
}

export function BlackKey(props: Props) {
  const { i, onDown, onUp, isPressed } = props;
  const x = (i + 1) * whiteKeyWidth - (blackKeyWidth / 2);
  const keyFill = isPressed ? 'url(#black-pressed)' : 'url(#black)';
  return (
    <rect
      onMouseDown={onDown}
      onMouseUp={onUp}
      x={x}
      y="0"
      width={blackKeyWidth}
      height="60"
      stroke="#000"
      fill={keyFill}
      strokeWidth="0.1"/>
  )
}


export const mapStateToProps = (state: IState, ownProps: OwnProps) => {
  const { id, midi } = ownProps;
  const { keys } = getModule(state, id) as IMidiKeyboard;
  const isPressed = !!keys[midi];
  return {
    isPressed,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const { id, midi } = ownProps;
  return {
    onDown: () => dispatch(keyboardKeyDownAction(id, midi)),
    onUp: () => dispatch(keyboardKeyUpAction(id, midi)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlackKey);
