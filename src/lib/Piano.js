import { Group } from 'three';
import Key from './Key';

class Piano {
  flatKeys = [];
  naturalKeys = [];
  displayText = true;
  highlightColor = '#61DBFB';
  pianoGroup = new Group();

  constructor() {
    this.initializeKeys();
    this.initializePianoGroup();
  }

  initializeKeys() {
    let flatKeyData = [
      ['Db3', '2', 5],
      ['Eb3', '3', 15],
      ['Gb3', '5', 35],
      ['Ab3', '6', 45],
      ['Bb3', '7', 55],
      ['Db4', 's', 75],
      ['Eb4', 'd', 85],
      ['Gb4', 'g', 105],
      ['Ab4', 'h', 115],
      ['Bb4', 'j', 125],
    ];

    let naturalKeyData = [
      ['C3', 'q', 0],
      ['D3', 'w', 10],
      ['E3', 'e', 20],
      ['F3', 'r', 30],
      ['G3', 't', 40],
      ['A3', 'y', 50],
      ['B3', 'u', 60],
      ['C4', 'z', 70],
      ['D4', 'x', 80],
      ['E4', 'c', 90],
      ['F4', 'v', 100],
      ['G4', 'b', 110],
      ['A4', 'n', 120],
      ['B4', 'm', 130],
    ];

    this.flatKeys = flatKeyData.map(([note, inputKey, position]) => new Key(note, inputKey, position));
    this.naturalKeys = naturalKeyData.map(([note, inputKey, position]) => new Key(note, inputKey, position));
  }

  initializePianoGroup() {
    this.pianoGroup.position.x = -65;
    this.pianoGroup.rotation.x = -Math.PI / 4;
    this.pianoGroup.add(
      ...this.flatKeys.map((key) => key.keyGroup),
      ...this.naturalKeys.map((key) => key.keyGroup)
    );
  }

  hideText() {
    this.naturalKeys.forEach((key) => key.hideKeyText());
  }

  renderText(font) {
    this.naturalKeys.forEach((key) => key.renderKeyText(font));
  }

  getPianoGroup() {
    return this.pianoGroup;
  }

  getKeyFromInput(inputKey) {
    return this.flatKeys.find((k) => k.inputKey === inputKey) || this.naturalKeys.find((k) => k.inputKey === inputKey);
  }

  maybePlayNote(eventKey) {
    let key = this.getKeyFromInput(eventKey);
    if (key) key.play(this.highlightColor);
  }

  maybeStopPlayingNote(eventKey) {
    let key = this.getKeyFromInput(eventKey);
    if (key) key.stopPlaying();
  }
}

export default Piano;
