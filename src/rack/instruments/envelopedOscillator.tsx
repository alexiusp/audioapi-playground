import * as React from 'react';
import { Button, Glyphicon, Panel, DropdownButton, MenuItem, FormControl, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Rack from '../../models/instrumentsRack';
import { ID, IOutput, IInput, Level, Time, ADSREnvelope } from '../../models/base';
import { Callback, DataCallback, OscillatorType } from '../../models/types';
import { getInstrument, getOutputs } from '../../store/instruments/selectors';
import IState from '../../store/state';
import {
  startPlayInstrumentAction,
  setOutputInstrumentAction,
  changeVolumeInstrumentAction,
  setOscillatorTypeInstrumentAction,
  setOscillatorFrequencyInstrumentAction,
  stopPlayInstrumentAction,
} from '../../store/instruments/actions';
import OutputSelector from '../../controls/outputSelector';
import EnvelopedOscillator from '../../models/instruments/envelopedOscillator';
import { setAttackEnvelopeInstrumentAction, setDecayEnvelopeInstrumentAction, setSustainEnvelopeInstrumentAction, setReleaseEnvelopeInstrumentAction } from '../../store/instruments/actions/envelope';
import { throttledCallback, parseLevel } from '../../utils/utils';
import RoundKnob from '../../controls/roundKnob';

import Sine from './sine.svg'
import WaveSelector from '../../controls/waveSelector';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  instrument: IOutput;
  envelope: ADSREnvelope;
  outputs: IInput[];
  onPlay: Callback;
  onStop: Callback;
  onSelectOutput: DataCallback;
  onChangeVolume: DataCallback<Level>;
  onSetOscType: DataCallback<any>;
  onChangeFrequency: DataCallback<number>;
  onAttackChange: DataCallback<Time>;
  onDecayChange: DataCallback<Time>;
  onSustainChange: DataCallback<Level>;
  onReleaseChange: DataCallback<Time>;
}

export function EnvelopedOscillatorUI(props: Props) {
  const osc = props.instrument as EnvelopedOscillator;
  const envelope = props.envelope;
  const outputs = [Rack.master, ...props.outputs];
  return (
    <Panel className="instrument simple-oscillator">
      <Panel.Heading>EnvelopedOscillator {osc.id}</Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={6}>
            <FormControl
              type="number"
              value={osc.frequency}
              onChange={(e) => props.onChangeFrequency(parseFloat((e.target as HTMLInputElement).value))} />
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
        <Row>
          <Col xs={6}>
            <RoundKnob
              radius={17}
              min={0}
              max={1}
              step={0.01}
              value={osc.volume}
              onUpdate={props.onChangeVolume} />
            <WaveSelector id={osc.id} selected={osc.oscillatorType} onSelect={props.onSetOscType} />
            <OutputSelector
              id={`${osc.id}-output-select`}
              active={osc.output}
              options={outputs}
              onSelect={props.onSelectOutput} />
            <Button onMouseDown={props.onPlay} onMouseUp={props.onStop}><Glyphicon glyph="play" /></Button>
          </Col>
          <Col xs={6}>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
}

export const mapStateToProps = (state: IState, ownProps: OwnProps) => {
  const instrument = getInstrument(state, ownProps.id) as EnvelopedOscillator;
  const envelope = instrument.envelope;
  const outputs = getOutputs(state);
  return {
    instrument,
    envelope,
    outputs,
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id; return {
    onPlay: () => dispatch(startPlayInstrumentAction(id)),
    onStop: () => dispatch(stopPlayInstrumentAction(id)),
    onSelectOutput: (output: ID) => dispatch(setOutputInstrumentAction(id, output)),
    onChangeVolume: (volume: Level) => dispatch(changeVolumeInstrumentAction(id, parseLevel(volume))),
    onSetOscType: (type: OscillatorType) => dispatch(setOscillatorTypeInstrumentAction(id, type)),
    onChangeFrequency: (freq: number) => dispatch(setOscillatorFrequencyInstrumentAction(id, freq)),
    onAttackChange: (attack: Time) => dispatch(setAttackEnvelopeInstrumentAction(id, parseLevel(attack))),
    onDecayChange: (decay: Time) => dispatch(setDecayEnvelopeInstrumentAction(id, parseLevel(decay))),
    onSustainChange: (sustain: Level) => dispatch(setSustainEnvelopeInstrumentAction(id, parseLevel(sustain))),
    onReleaseChange: (release: Time) => dispatch(setReleaseEnvelopeInstrumentAction(id, parseLevel(release))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvelopedOscillatorUI);
