import { Player } from 'tone';
import { BoxGeometry, Group, Mesh, MeshBasicMaterial, MeshNormalMaterial, MeshStandardMaterial, Vector3 } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

class Key {
  note;
  inputKey;
  isFlat;
  sound;
  theta = Math.PI / 32;
  axis = new Vector3(1, 0, 0);
  point = new Vector3(0, 20, 0);
  keyMesh;
  keyGroup = new Group();

  constructor(note, inputKey, xOffset) {
    this.note = note;
    this.inputKey = inputKey;
    this.isFlat = note.length === 3;

    this.initializeSound();
    this.initializeKeyMesh();
    this.initializeKeyGroup(xOffset);
  }

  initializeSound() {
    this.sound = new Player(`./acoustic_grand_piano_mp3/${this.note}.mp3`).toDestination();
  }

  initializeKeyMesh() {
    if (this.isFlat) {
      const geometry = new BoxGeometry(4.5, 26, 4);
      const material = new MeshBasicMaterial({ color: '#0f0f0f' });
      this.keyMesh = new Mesh(geometry, material);
      this.keyMesh.position.z = 4;
      this.keyMesh.position.y = 7;
    } else {
      const geometry = new BoxGeometry(9, 40, 4);
      const material = new MeshStandardMaterial({ color: '#ffffff' });
      this.keyMesh = new Mesh(geometry, material);
    }
  }

  initializeKeyGroup(xOffset) {
    this.keyGroup.position.x = xOffset;
    this.keyGroup.add(this.keyMesh);
  }

  hideKeyText() {
    this.textMesh.visible = false;
  }

  renderKeyText(font) {
    if (this.textMesh) {
      this.textMesh.visible = true;
    } else {
      const geometry = new TextGeometry(this.note[0], {
        font,
        size: 4,
        height: 2,
      });
      const material = new MeshNormalMaterial();
      this.textMesh = new Mesh(geometry, material);
      this.textMesh.position.z = 2;
      this.textMesh.position.x = -1.5;
      this.textMesh.position.y = -18;
      this.keyGroup.add(this.textMesh);
    }
  }

  rotateAroundWorldAxis(rotation) {
    this.keyGroup.position.sub(this.point);
    this.keyGroup.position.applyAxisAngle(this.axis, this.theta * rotation);
    this.keyGroup.position.add(this.point);
    this.keyGroup.rotateOnAxis(this.axis, this.theta * rotation);
  }

  play(highlightColor) {
    this.rotateAroundWorldAxis(1);
    this.sound.start();
    this.keyMesh.material.color.set(highlightColor);
    setTimeout(() => this.sound.stop(), 150000);
  }

  stopPlaying() {
    this.keyMesh.material.color.set(this.isFlat ? '#000000' : '#ffffff');
    this.rotateAroundWorldAxis(-1);
  }
}

export default Key;
