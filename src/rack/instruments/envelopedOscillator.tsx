import * as React from 'react';
import { Button, Glyphicon, Panel, FormControl, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { throttledCallback, parseLevel } from '../../utils/utils';
import Rack from '../../models/instrumentsRack';
import { ID, IOutput, IInput, Level, Time, IEnvelope, ILegacyEnvelopedOscillator, IEnvelopedOscillator, IInstrument, ModuleEnum } from '../../models/base';
import { Callback, DataCallback, OscillatorType } from '../../models/types';
import { getLegacyInstrument, getOutputs, getInstrument, getModule } from '../../store/instruments/selectors';
import IState from '../../store/state';
import {
  startPlayInstrumentAction,
  setOutputInstrumentAction,
  changeVolumeInstrumentAction,
  setOscillatorTypeInstrumentAction,
  setOscillatorFrequencyInstrumentAction,
  stopPlayInstrumentAction,
} from '../../store/instruments/actions';
import {
  setAttackEnvelopeInstrumentAction,
  setDecayEnvelopeInstrumentAction,
  setSustainEnvelopeInstrumentAction,
  setReleaseEnvelopeInstrumentAction
} from '../../store/instruments/actions/envelope';
import RoundKnob from '../../controls/roundKnob';
import OutputSelector from '../../controls/outputSelector';
import WaveSelector from '../../controls/waveSelector';
import Envelope from '../modules/Envelope';

export interface OwnProps {
  id: ID;
}

export interface Props extends OwnProps {
  name: string;
  envelope: ID;
  oscillator: ID;
//  instrument: IOutput;
//  outputs: IInput[];
//  onPlay: Callback;
//  onStop: Callback;
//  onSelectOutput: DataCallback;
//  onChangeVolume: DataCallback<Level>;
//  onSetOscType: DataCallback<any>;
//  onChangeFrequency: DataCallback<number>;
}

export function EnvelopedOscillator(props: Props) {
  return (
    <Panel className="instrument enveloped-oscillator">
      <Panel.Heading>{props.name} {props.id}</Panel.Heading>
      <Panel.Body>
        <Row>
          <Col xs={6}>
          {
            /*
            <FormControl
              type="number"
              value={osc.frequency}
              onChange={(e) => props.onChangeFrequency(parseFloat((e.target as HTMLInputElement).value))} />
            */
          }
          </Col>
          <Col xs={6}>
            <Envelope id={props.envelope} />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
          {
            /*
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
            */
          }
          </Col>
          <Col xs={6}>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
}

export const mapStateToProps = (state: IState, ownProps: OwnProps) => {
  const instrument = getInstrument(state, ownProps.id) as IInstrument;
  const modules = instrument.modules;
  let envelope: string = '';
  let oscillator: string = '';
  modules.forEach(id => {
    const module = getModule(state, id);
    if (module.name === ModuleEnum.Envelope) {
      envelope = id;
    } else {
      oscillator = id;
    }
  });
  return {
    name: instrument.name,
    envelope,
    oscillator,
  }
}

/*
export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  const id = ownProps.id;
  return {
    onPlay: () => dispatch(startPlayInstrumentAction(id)),
    onStop: () => dispatch(stopPlayInstrumentAction(id)),
    onSelectOutput: (output: ID) => dispatch(setOutputInstrumentAction(id, output)),
    onChangeVolume: (volume: Level) => dispatch(changeVolumeInstrumentAction(id, parseLevel(volume))),
    onSetOscType: (type: OscillatorType) => dispatch(setOscillatorTypeInstrumentAction(id, type)),
    onChangeFrequency: (freq: number) => dispatch(setOscillatorFrequencyInstrumentAction(id, freq)),
  }
}
*/
// export default connect(mapStateToProps, mapDispatchToProps)(EnvelopedOscillator);
export default connect(mapStateToProps, null)(EnvelopedOscillator);
