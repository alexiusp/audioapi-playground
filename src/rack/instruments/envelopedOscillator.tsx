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
import VolumeControl from '../../controls/volumeControl';
import EnvelopedOscillator from '../../models/instruments/envelopedOscillator';
import { setAttackEnvelopeInstrumentAction, setDecayEnvelopeInstrumentAction, setSustainEnvelopeInstrumentAction, setReleaseEnvelopeInstrumentAction } from '../../store/instruments/actions/envelope';
import { throttledChangeHandler } from '../../utils/utils';

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
  const stubHandler = () => null;
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
          <Col xs={6}>
            <div className="level-control">
              <label htmlFor="attack-control">Attack</label>
              <input
                name="attack-control"
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue={envelope.attack.toString()}
                onChange={throttledChangeHandler(props.onAttackChange)} />
              <span>{envelope.attack}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <VolumeControl volume={osc.volume} onVolumeChange={props.onChangeVolume} />
          </Col>
          <Col xs={6}>
            <div className="level-control">
              <label htmlFor="decay-control">Decay</label>
              <input
                name="decay-control"
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue={envelope.decay.toString()}
                onChange={throttledChangeHandler(props.onDecayChange)} />
              <span>{envelope.decay}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <DropdownButton
              onSelect={props.onSetOscType}
              title={osc.oscillatorType}
              id={`${osc.id}-type-selector`}>
              <MenuItem active={osc.oscillatorType === 'sine'} eventKey="sine">sine</MenuItem>
              <MenuItem active={osc.oscillatorType === 'square'} eventKey="square">square</MenuItem>
              <MenuItem active={osc.oscillatorType === 'triangle'} eventKey="triangle">triangle</MenuItem>
              <MenuItem active={osc.oscillatorType === 'sawtooth'} eventKey="sawtooth">sawtooth</MenuItem>
            </DropdownButton>
            <OutputSelector
              id={`${osc.id}-output-select`}
              active={osc.output}
              options={outputs}
              onSelect={props.onSelectOutput} />
            <Button onMouseDown={props.onPlay} onMouseUp={props.onStop}><Glyphicon glyph="play" /></Button>
          </Col>
          <Col xs={6}>
            <div className="level-control">
              <label htmlFor="sustain-control">Sustain</label>
              <input
                name="sustain-control"
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue={envelope.sustain.toString()}
                onChange={throttledChangeHandler(props.onSustainChange)} />
              <span>{envelope.sustain}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
          </Col>
          <Col xs={6}>
            <div className="level-control">
              <label htmlFor="release-control">Release</label>
              <input
                name="release-control"
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue={envelope.release.toString()}
                onChange={throttledChangeHandler(props.onReleaseChange)} />
              <span>{envelope.release}</span>
            </div>
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
  const id = ownProps.id;  return {
    onPlay: () => dispatch(startPlayInstrumentAction(id)),
    onStop: () => dispatch(stopPlayInstrumentAction(id)),
    onSelectOutput: (output: ID) => dispatch(setOutputInstrumentAction(id, output)),
    onChangeVolume: (volume: Level) => dispatch(changeVolumeInstrumentAction(id, volume)),
    onSetOscType: (type: OscillatorType) => dispatch(setOscillatorTypeInstrumentAction(id, type)),
    onChangeFrequency: (freq: number) => dispatch(setOscillatorFrequencyInstrumentAction(id, freq)),
    onAttackChange: (attack: Time) => dispatch(setAttackEnvelopeInstrumentAction(id, attack)),
    onDecayChange: (decay: Time) => dispatch(setDecayEnvelopeInstrumentAction(id, decay)),
    onSustainChange: (sustain: Level) => dispatch(setSustainEnvelopeInstrumentAction(id, sustain)),
    onReleaseChange: (release: Time) => dispatch(setReleaseEnvelopeInstrumentAction(id, release)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvelopedOscillatorUI);
