import { useEffect } from 'react';

import { GUI } from 'dat.gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import SceneInit from './lib/SceneInit';
import Piano from './lib/Piano';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initScene();
    test.animate();

    const p = new Piano();
    test.scene.add(p.getPianoGroup());

    const fontLoader = new FontLoader();
    fontLoader.load('./fonts/Helvetica-Bold.typeface.json', (font) => {
      p.renderText(font);
    });

    const gui = new GUI();
    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(test.camera.position, 'z', 100, 200);
    cameraFolder.open();

    
    const pianoFolder = gui.addFolder('Piano');
    pianoFolder.addColor(p, 'highlightColor').name('Highlight Color');
    pianoFolder
      .add(p, 'displayText')
      .name('Display Text')
      .onChange((value) => {
        if (value) {
          p.renderText();
        } else {
          p.hideText();
        }
      });
    pianoFolder.open();

    const onKeyDown = (event) => {
      if (event.repeat) {
        return;
      }
      p.maybePlayNote(event.key);
    };

    const onKeyUp = (event) => {
      p.maybeStopPlayingNote(event.key);
    };

    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('keydown', onKeyDown);
    };

    
  });

  return (
    <div>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}

export default App;
