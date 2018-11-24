import * as React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { parseLevel, throttledCallback } from '../../utils/utils';
import IState from '../../store/state';
import { IMonophonicSynth, IOutput, IEnvelope, IInput } from '../../models/base';
import { DataCallback, ID, Level, Time } from '../../models/types';
import { getLegacyInstrument, getOutputs } from '../../store/instruments/selectors';
import {
  setAttackEnvelopeModuleAction,
  setDecayEnvelopeModuleAction,
  setSustainEnvelopeModuleAction,
  setReleaseEnvelopeModuleAction,
} from '../../store/instruments/actions/envelope';
import Rack from '../../models/instrumentsRack';
import RoundKnob from '../../controls/roundKnob';
import OutputSelector from '../../controls/outputSelector';
import WaveSelector from '../../controls/waveSelector';
import Keyboard from '../../controls/keyboard/keyboard';
import { setFrequencyOscillatorModuleAction, setTypeOscillatorModuleAction } from '../../store/instruments/actions/oscillator';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  instrument: IOutput;
  envelope: IEnvelope;
  outputs: IInput[];
  onSelectOutput: DataCallback;
  onChangeVolume: DataCallback<Level>;
  onSetOscType: DataCallback<any>;
  onAttackChange: DataCallback<Time>;
  onDecayChange: DataCallback<Time>;
  onSustainChange: DataCallback<Level>;
  onReleaseChange: DataCallback<Time>;
}

export function MonophonicSynthUI(props: Props) {
  const inst = props.instrument as IMonophonicSynth;
  const envelope = props.envelope;
  const outputs = [Rack.master, ...props.outputs];
  return (
    <Panel className="instrument monophonic-synth">
      <Panel.Heading>MonophonicSynth {inst.id}</Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={6}>
            <RoundKnob
              radius={17}
              min={0}
              max={1}
              step={0.01}
              value={inst.volume}
              onUpdate={props.onChangeVolume} />
            <WaveSelector id={inst.id} selected={inst.oscillatorType} onSelect={props.onSetOscType} />
            <OutputSelector
              id={`${inst.id}-output-select`}
              active={inst.output}
              options={outputs}
              onSelect={props.onSelectOutput} />
          </Col>
          <Col xs={6} className="adsr-controls">
            <div>
              <RoundKnob
                radius={17}
                min={0}
                max={1}
                step={0.01}
                value={envelope.attack}
                onUpdate={throttledCallback(props.onAttackChange)} />
              <div>Attack</div>
            </div>
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
          </Col>
        </Row>
      </Panel.Body>
      <Panel.Body>
        <Keyboard id={props.id} />
      </Panel.Body>
    </Panel>
  );
}

export const mapStateToProps = (state: IState, ownProps: OwnProps) => {
  const instrument = getLegacyInstrument(state, ownProps.id) as IMonophonicSynth;
  const envelope = instrument.envelope;
  const outputs = getOutputs(state);
  return {
    instrument,
    envelope,
    outputs,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
//    onSelectOutput: (output: ID) => dispatch(setOutputInstrumentAction(id, output)),
//    onChangeVolume: (volume: Level) => dispatch(changeVolumeInstrumentAction(id, parseLevel(volume))),
    onSetOscType: (type: OscillatorType) => dispatch(setTypeOscillatorModuleAction(id, type)),
    onAttackChange: (attack: Time) => dispatch(setAttackEnvelopeModuleAction(id, parseLevel(attack))),
    onDecayChange: (decay: Time) => dispatch(setDecayEnvelopeModuleAction(id, parseLevel(decay))),
    onSustainChange: (sustain: Level) => dispatch(setSustainEnvelopeModuleAction(id, parseLevel(sustain))),
    onReleaseChange: (release: Time) => dispatch(setReleaseEnvelopeModuleAction(id, parseLevel(release))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonophonicSynthUI);
