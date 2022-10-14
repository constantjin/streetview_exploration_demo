import { useEffect } from 'react';

export default function KeyboardController() {
  const keyboardInputToAction = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyA':
        console.log('fovToLeft');
        break;
      case 'KeyD':
        console.log('fovToRight');
        break;
      case 'KeyW':
        console.log('fowardToLink');
        break;
      case 'KeyS':
        console.log('backwardToLink');
        break;
      case 'KeyF':
        console.log('captureScene');
        break;
    }
  };

  const resetActionOnRelease = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyA':
      case 'KeyD':
      case 'KeyW':
      case 'KeyS':
      case 'KeyF':
        console.log('stop');
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboardInputToAction);
    document.addEventListener('keyup', resetActionOnRelease);

    return () => {
      document.removeEventListener('keydown', keyboardInputToAction);
      document.removeEventListener('keyup', resetActionOnRelease);
    };
  }, []);

  return <div></div>;
}
