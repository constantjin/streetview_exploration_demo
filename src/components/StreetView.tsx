import { useEffect, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import {
  initialPov,
  initialControlOptions,
  actionHandlerOptions,
} from '../constants';
import {
  initialLocationAtom,
  streetViewRefAtom,
  controllerActionAtom,
} from '../stores';

export default function StreetView() {
  const streetViewDivRef = useRef<HTMLDivElement>(null);
  // Storing a timer object for continuous action repetition
  // Reference: https://stackoverflow.com/questions/65638439/type-for-useref-if-used-with-setinterval-react-typescript
  const actionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initialLocation = useAtomValue(initialLocationAtom);
  const controllerAction = useAtomValue(controllerActionAtom);

  const streetViewRef = useAtomValue(streetViewRefAtom);
  const setStreetViewRef = useSetAtom(streetViewRefAtom);

  // Helper functions for timer

  // Set a timer to repeat the specified action handler function.
  // An action handler function should return void, without any parameter
  const setActionInterval = (actionHandler: () => void, interval: number) => {
    resetActionInterval(); // Reset the current action timer
    actionHandler(); // Execute the action immediately
    // Repeat this action using setInterval()
    actionIntervalRef.current = setInterval(() => {
      actionHandler();
    }, interval);
  };

  const resetActionInterval = () => {
    if (actionIntervalRef.current) {
      clearInterval(actionIntervalRef.current);
      actionIntervalRef.current = null;
    }
  };

  // Action handler functions

  // Heading change handler factory for setActionInterval
  const handleHeadingChange = (headingAmount: number) => {
    return () => {
      // Run only when streetViewRef is defined (when Street View is initialized)
      if (streetViewRef) {
        const currentPov = streetViewRef.getPov();
        const currentHeading = currentPov.heading;
        streetViewRef.setPov({
          ...currentPov,
          heading: currentHeading + headingAmount,
        });
      }
    };
  };

  // Actual handler function for headingToLeft(Right) actions
  const handleHeadingToLeft =
    // Note that negative heading amounts represent left heading direction
    handleHeadingChange(-actionHandlerOptions.headingChangeAmount);

  const handleHeadingToRight = handleHeadingChange(
    actionHandlerOptions.headingChangeAmount,
  );

  // useEffect: initialize Street View on mount
  useEffect(() => {
    setStreetViewRef(
      new window.google.maps.StreetViewPanorama(
        streetViewDivRef.current as HTMLDivElement,
        {
          position: initialLocation.latlng,
          pov: initialPov,
          zoom: 0,
          ...initialControlOptions,
        },
      ),
    );
  }, []);

  // useEffect: watch controllerAction and assign handlers to actions
  useEffect(() => {
    console.log(controllerAction);
    switch (controllerAction) {
      case 'stopAction':
        resetActionInterval();
        break;
      case 'headingToLeft':
        setActionInterval(
          handleHeadingToLeft,
          actionHandlerOptions.headingChangeIntervalInMs,
        );
        break;
      case 'headingToRight':
        setActionInterval(
          handleHeadingToRight,
          actionHandlerOptions.headingChangeIntervalInMs,
        );
        break;
    }
  }, [controllerAction]);

  return (
    <div
      ref={streetViewDivRef}
      id="streetview"
      style={{ width: '800px', height: '600px' }}
    />
  );
}
