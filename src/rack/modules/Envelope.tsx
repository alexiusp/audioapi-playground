import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID, IEnvelopedOscillator, Time, Level } from '../../models/base';
import { getLegacyInstrument } from '../../store/instruments/selectors';
import IState from '../../store/state';
import RoundKnob from '../../controls/roundKnob';
import { throttledCallback, parseLevel } from '../../utils/utils';
import { setAttackEnvelopeInstrumentAction } from '../../store/instruments/actions/envelope';
import { DataCallback } from '../../models/types';

export interface OwnProps {
  id: ID;
  attack: Time;
  decay: Time;
  sustain: Level;
  release: Time;
}

export interface Props extends OwnProps {
  onAttackChange: DataCallback<Time>;
}

export function Envelope(props: Props) {
  return (
    <div className="adsr-controls">
      <div>
        <RoundKnob
          radius={17}
          min={0}
          max={1}
          step={0.01}
          value={props.attack}
          onUpdate={throttledCallback(props.onAttackChange)} />
        <div>Attack</div>
      </div>
    </div>
  );
}

/*
            <div>
              <RoundKnob
                radius={17}
                min={0}
                max={1}
                step={0.01}
                value={envelope.decay}
                onUpdate={throttledCallback(props.onDecayChange)} />
              <div>Decay</div>
            </div>
            <div>
              <RoundKnob
                radius={17}
                min={0}
                max={1}
                step={0.01}
                value={envelope.sustain}
                onUpdate={throttledCallback(props.onSustainChange)} />
              <div>Sustain</div>
            </div>
            <div>
              <RoundKnob
                radius={17}
                min={0}
                max={1}
                step={0.01}
                value={envelope.release}
                onUpdate={throttledCallback(props.onReleaseChange)} />
              <div>Release</div>
            </div>
*/

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
    onAttackChange: (attack: Time) => dispatch(setAttackEnvelopeInstrumentAction(id, parseLevel(attack))),
  }
}

export default connect(null, mapDispatchToProps)(Envelope);
