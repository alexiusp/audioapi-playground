import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID } from '../../models/base';
import IState from '../../store/state';

import WhiteKey from './whiteKey';
import BlackKey from './blackKey';
import './keyboard.css';

export interface OwnProps {
  id: ID;
  className?: string;
}

export interface Props extends OwnProps {
}

export function Keyboard(props: Props) {
  const { className, id } = props;
  // viewbox should be dynamic to be able to add more keys in the future
  const viewBox = '0 0 49 100';
  return (
    <div className={'keyboard control ' + (className || '')}>
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      width="100%" height="100%">
      <WhiteKey id={id} i={0} midi={60} />
      <WhiteKey id={id} i={1} midi={62} />
      <WhiteKey id={id} i={2} midi={64} />
      <WhiteKey id={id} i={3} midi={65} />
      <WhiteKey id={id} i={4} midi={67} />
      <WhiteKey id={id} i={5} midi={69} />
      <WhiteKey id={id} i={6} midi={71} />
      <BlackKey id={id} i={0} midi={61} />
      <BlackKey id={id} i={1} midi={63} />
      <BlackKey id={id} i={3} midi={66} />
      <BlackKey id={id} i={4} midi={68} />
      <BlackKey id={id} i={5} midi={70} />
    </svg>
    </div>
  );
}

export const mapStateToProps = (state: IState, ownProps: OwnProps) => {
  return {
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);
