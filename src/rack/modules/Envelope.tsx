import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID, IEnvelopedOscillator, Time, Level, IEnvelope } from '../../models/base';
import { getLegacyInstrument, getModule } from '../../store/instruments/selectors';
import IState from '../../store/state';
import RoundKnob from '../../controls/roundKnob';
import { throttledCallback, parseLevel } from '../../utils/utils';
import { setAttackEnvelopeInstrumentAction, setDecayEnvelopeInstrumentAction, setSustainEnvelopeInstrumentAction, setReleaseEnvelopeInstrumentAction } from '../../store/instruments/actions/envelope';
import { DataCallback } from '../../models/types';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  attack: Time;
  decay: Time;
  sustain: Level;
  release: Time;
  onAttackChange: DataCallback<Time>;
  onDecayChange: DataCallback<Time>;
  onSustainChange: DataCallback<Level>;
  onReleaseChange: DataCallback<Time>;
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
      <div>
        <RoundKnob
          radius={17}
          min={0}
          max={1}
          step={0.01}
          value={props.decay}
          onUpdate={throttledCallback(props.onDecayChange)} />
        <div>Decay</div>
      </div>
      <div>
        <RoundKnob
          radius={17}
          min={0}
          max={1}
          step={0.01}
          value={props.sustain}
          onUpdate={throttledCallback(props.onSustainChange)} />
        <div>Sustain</div>
      </div>
      <div>
        <RoundKnob
          radius={17}
          min={0}
          max={1}
          step={0.01}
          value={props.release}
          onUpdate={throttledCallback(props.onReleaseChange)} />
        <div>Release</div>
      </div>
    </div>
  );
}

export const mapStateToProps = (state: IState, props: OwnProps) => {
  const envelope = getModule(state, props.id) as IEnvelope;
  const { attack, decay, sustain, release } = envelope;
  return {
    attack,
    decay,
    sustain,
    release,
  };
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
    onAttackChange: (attack: Time) => dispatch(setAttackEnvelopeInstrumentAction(id, parseLevel(attack))),
    onDecayChange: (decay: Time) => dispatch(setDecayEnvelopeInstrumentAction(id, parseLevel(decay))),
    onSustainChange: (sustain: Level) => dispatch(setSustainEnvelopeInstrumentAction(id, parseLevel(sustain))),
    onReleaseChange: (release: Time) => dispatch(setReleaseEnvelopeInstrumentAction(id, parseLevel(release))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Envelope);
