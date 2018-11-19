import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Callback } from '../../models/types';
import { ID } from '../../models/base';
import IState from '../../store/state';
import { whiteKeyWidth } from './constants';
import { keyboardKeyDownAction, keyboardKeyUpAction } from '../../store/instruments/actions/keyboard';
import { MIDINoteIndex } from '../../utils/midi';

export interface OwnProps {
  // instrument id
  id: ID;
  // key index
  i: number;
  // corresponding midi note number
  midi: number
}

export interface Props extends OwnProps {
  onDown: Callback;
  onUp: Callback;
}

export function WhiteKey(props: Props) {
  const { i, onDown, onUp } = props;
  const x = i * whiteKeyWidth;
  return (
    <rect
      onMouseDown={onDown}
      onMouseUp={onUp}
      x={x}
      y="0"
      width={whiteKeyWidth}
      height="100"
      stroke="#000"
      fill="url(#white)"
      strokeWidth="0.1"/>
  )
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const { id, midi } = ownProps;
  const keyName = MIDINoteIndex[midi].fullName;
  return {
    onDown: () => dispatch(keyboardKeyDownAction(id, keyName)),
    onUp: () => dispatch(keyboardKeyUpAction(id, keyName)),
  }
}

export default connect(null, mapDispatchToProps)(WhiteKey);
