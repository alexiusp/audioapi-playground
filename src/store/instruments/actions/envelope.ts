import { Action, ActionCreator } from 'redux';
import { ID, Time, Level } from '../../../models/base';
import { type } from 'os';

export const INSTRUMENT_ENVELOPE_ATTACK_SET = 'INSTRUMENT_ENVELOPE_ATTACK_SET';
export type INSTRUMENT_ENVELOPE_ATTACK_SET = typeof INSTRUMENT_ENVELOPE_ATTACK_SET;
export interface ISetAttackEnvelopeInstrumentAction extends Action<INSTRUMENT_ENVELOPE_ATTACK_SET> {
  type: INSTRUMENT_ENVELOPE_ATTACK_SET;
  payload: {
    id: ID,
    attack: Time,
  };
}
export const setAttackEnvelopeInstrumentAction: ActionCreator<ISetAttackEnvelopeInstrumentAction> = (id: ID, attack: Time) => ({
  type: INSTRUMENT_ENVELOPE_ATTACK_SET,
  payload: {
    id,
    attack,
  },
});

export const INSTRUMENT_ENVELOPE_DECAY_SET = 'INSTRUMENT_ENVELOPE_DECAY_SET';
export type INSTRUMENT_ENVELOPE_DECAY_SET = typeof INSTRUMENT_ENVELOPE_DECAY_SET;
export interface ISetDecayEnvelopeInstrumentAction extends Action<INSTRUMENT_ENVELOPE_DECAY_SET> {
  type: INSTRUMENT_ENVELOPE_DECAY_SET;
  payload: {
    id: ID,
    decay: Time,
  };
}
export const setDecayEnvelopeInstrumentAction: ActionCreator<ISetDecayEnvelopeInstrumentAction> = (id: ID, decay: Time) => ({
  type: INSTRUMENT_ENVELOPE_DECAY_SET,
  payload: {
    id,
    decay,
  },
});

export const INSTRUMENT_ENVELOPE_SUSTAIN_SET = 'INSTRUMENT_ENVELOPE_SUSTAIN_SET';
export type INSTRUMENT_ENVELOPE_SUSTAIN_SET = typeof INSTRUMENT_ENVELOPE_SUSTAIN_SET;
export interface ISetSustainEnvelopeInstrumentAction extends Action<INSTRUMENT_ENVELOPE_SUSTAIN_SET> {
  type: INSTRUMENT_ENVELOPE_SUSTAIN_SET;
  payload: {
    id: ID,
    sustain: Level,
  };
}
export const setSustainEnvelopeInstrumentAction: ActionCreator<ISetSustainEnvelopeInstrumentAction> = (id: ID, sustain: Level) => ({
  type: INSTRUMENT_ENVELOPE_SUSTAIN_SET,
  payload: {
    id,
    sustain,
  },
});

export const INSTRUMENT_ENVELOPE_RELEASE_SET = 'INSTRUMENT_ENVELOPE_RELEASE_SET';
export type INSTRUMENT_ENVELOPE_RELEASE_SET = typeof INSTRUMENT_ENVELOPE_RELEASE_SET;
export interface ISetReleaseEnvelopeInstrumentAction extends Action<INSTRUMENT_ENVELOPE_RELEASE_SET> {
  type: INSTRUMENT_ENVELOPE_RELEASE_SET;
  payload: {
    id: ID,
    release: Time,
  };
}
export const setReleaseEnvelopeInstrumentAction: ActionCreator<ISetReleaseEnvelopeInstrumentAction> = (id: ID, release: Time) => ({
  type: INSTRUMENT_ENVELOPE_RELEASE_SET,
  payload: {
    id,
    release,
  },
});

export type EnvelopeAction =
  ISetAttackEnvelopeInstrumentAction |
  ISetDecayEnvelopeInstrumentAction |
  ISetSustainEnvelopeInstrumentAction |
  ISetReleaseEnvelopeInstrumentAction;
