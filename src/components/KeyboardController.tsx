import { useEffect } from 'react';
import { useSetAtom } from 'jotai';

import { controllerActionAtom } from '../stores';

export default function KeyboardController() {
  const setControllerAction = useSetAtom(controllerActionAtom);

  const keyboardInputToAction = (event: KeyboardEvent) => {
    switch (event.code) {
      // The heading (StreetViewPov.heading) will change, rather than the entire StreetViewPov object
      // Should rename fovToLeft(Right) -> headingToLeft(Right)
      case 'KeyA':
        setControllerAction('headingToLeft');
        break;
      case 'KeyD':
        setControllerAction('headingToRight');
        break;
      case 'KeyW':
        setControllerAction('fowardToLink');
        break;
      case 'KeyS':
        setControllerAction('backwardToLink');
        break;
      case 'KeyF':
        setControllerAction('captureScene');
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
        setControllerAction('stopAction');
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyboardInputToAction);
    document.addEventListener('keyup', resetActionOnRelease);

    return () => {
      // Set the controller action to 'stop' on destroy of this component
      setControllerAction('stopAction');
      document.removeEventListener('keydown', keyboardInputToAction);
      document.removeEventListener('keyup', resetActionOnRelease);
    };
  }, []);

  return <div></div>;
}
