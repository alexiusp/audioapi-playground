import { Action, ActionCreator } from 'redux';
import { ID, Time, Level } from '../../../models/base';

export const MODULE_ENVELOPE_ATTACK_SET = 'MODULE_ENVELOPE_ATTACK_SET';
export type MODULE_ENVELOPE_ATTACK_SET = typeof MODULE_ENVELOPE_ATTACK_SET;
export interface ISetAttackEnvelopeModuleAction extends Action<MODULE_ENVELOPE_ATTACK_SET> {
  type: MODULE_ENVELOPE_ATTACK_SET;
  payload: {
    id: ID,
    attack: Time,
  };
}
export const setAttackEnvelopeModuleAction: ActionCreator<ISetAttackEnvelopeModuleAction> = (id: ID, attack: Time) => ({
  type: MODULE_ENVELOPE_ATTACK_SET,
  payload: {
    id,
    attack,
  },
});

export const MODULE_ENVELOPE_DECAY_SET = 'MODULE_ENVELOPE_DECAY_SET';
export type MODULE_ENVELOPE_DECAY_SET = typeof MODULE_ENVELOPE_DECAY_SET;
export interface ISetDecayEnvelopeModuleAction extends Action<MODULE_ENVELOPE_DECAY_SET> {
  type: MODULE_ENVELOPE_DECAY_SET;
  payload: {
    id: ID,
    decay: Time,
  };
}
export const setDecayEnvelopeModuleAction: ActionCreator<ISetDecayEnvelopeModuleAction> = (id: ID, decay: Time) => ({
  type: MODULE_ENVELOPE_DECAY_SET,
  payload: {
    id,
    decay,
  },
});

export const MODULE_ENVELOPE_SUSTAIN_SET = 'MODULE_ENVELOPE_SUSTAIN_SET';
export type MODULE_ENVELOPE_SUSTAIN_SET = typeof MODULE_ENVELOPE_SUSTAIN_SET;
export interface ISetSustainEnvelopeModuleAction extends Action<MODULE_ENVELOPE_SUSTAIN_SET> {
  type: MODULE_ENVELOPE_SUSTAIN_SET;
  payload: {
    id: ID,
    sustain: Level,
  };
}
export const setSustainEnvelopeModuleAction: ActionCreator<ISetSustainEnvelopeModuleAction> = (id: ID, sustain: Level) => ({
  type: MODULE_ENVELOPE_SUSTAIN_SET,
  payload: {
    id,
    sustain,
  },
});

export const MODULE_ENVELOPE_RELEASE_SET = 'MODULE_ENVELOPE_RELEASE_SET';
export type MODULE_ENVELOPE_RELEASE_SET = typeof MODULE_ENVELOPE_RELEASE_SET;
export interface ISetReleaseEnvelopeModuleAction extends Action<MODULE_ENVELOPE_RELEASE_SET> {
  type: MODULE_ENVELOPE_RELEASE_SET;
  payload: {
    id: ID,
    release: Time,
  };
}
export const setReleaseEnvelopeModuleAction: ActionCreator<ISetReleaseEnvelopeModuleAction> = (id: ID, release: Time) => ({
  type: MODULE_ENVELOPE_RELEASE_SET,
  payload: {
    id,
    release,
  },
});

export type EnvelopeAction =
  ISetAttackEnvelopeModuleAction |
  ISetDecayEnvelopeModuleAction |
  ISetSustainEnvelopeModuleAction |
  ISetReleaseEnvelopeModuleAction;
