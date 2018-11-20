# Web Audio API playground

## Project goals

The main goal is by learning the Web Audio API implement musical instruments rack similar (but very simplified) to Propellerhead Reason(c).

## Implemented

* *MasterMixer* - simple panel with 'master' controls.
* *SimpleOscillator* - basic version of oscillator to learn basics of Audio API
* *EnvelopedOscillator* - version of oscillator with enveloped gain node (ADSR)
* *KnobControl* - UI element to control ranged audio paramers (volume, frequency etc.)
* *MIDI keyboard* - UI element to control frequency parameter

## In progress:
* refactor developed parts (osc, envelope, keyboard) to connectable modules
* implement connection of oscillator output to audio parameter (volume, frequency)

## TODO:

* ModulatedOscillator - version of oscillator with an option to control some parameter via second oscillator
