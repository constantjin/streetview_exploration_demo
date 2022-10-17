import { useEffect, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import html2canvas from 'html2canvas';

import {
  initialPov,
  initialControlOptions,
  actionHandlerOptions,
} from '../constants';
import {
  initialLocationAtom,
  streetViewRefAtom,
  controllerActionAtom,
  base64EncodedImageAtom,
} from '../stores';
import { delay } from '../utils';

export default function StreetView() {
  const streetViewDivRef = useRef<HTMLDivElement>(null);
  // Storing a timer object for continuous action repetition
  // Reference: https://stackoverflow.com/questions/65638439/type-for-useref-if-used-with-setinterval-react-typescript
  const actionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initialLocation = useAtomValue(initialLocationAtom);
  const controllerAction = useAtomValue(controllerActionAtom);

  const streetViewRef = useAtomValue(streetViewRefAtom);
  const setStreetViewRef = useSetAtom(streetViewRefAtom);
  const setBase64EncodedImage = useSetAtom(base64EncodedImageAtom);

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

  // Link change handler factory for setActionInterval
  interface IHandleLinkChangeProps {
    backward: boolean;
  }
  const handleLinkChange = (handleLinkChangeProps?: IHandleLinkChangeProps) => {
    return () => {
      // Run only when streetViewRef is defined (when Street View is initialized)
      if (streetViewRef) {
        const linksInCurrentScene = streetViewRef.getLinks();
        const currentPov = streetViewRef.getPov();
        const currentHeading = currentPov.heading;

        // If no link is found in this scene, quit the function
        if (!linksInCurrentScene) {
          return;
        }

        // Define a comparison function to calculate distance between headings for each link and the current heading
        const compareHeadingDifferenceForLinks = (
          link: google.maps.StreetViewLink | null,
        ) => {
          // If this link does not have heading or pano information, assign a maximal distance
          if (!(link?.heading && link?.pano)) {
            return Infinity;
          }

          // Compare the normalized current heading (% 360) with this link's heading
          // If difference is over 180, normalize the difference
          let headingDifference = Math.abs(
            (currentHeading % 360) - link.heading,
          );
          if (headingDifference > 180) {
            headingDifference = Math.abs(360 - headingDifference);
          }
          return headingDifference;
        };

        // Assign headingDifference for each link
        // And filter out links with Infinity difference
        const linksForHeadingDifference = linksInCurrentScene
          .map((link) => {
            return {
              pano: link?.pano,
              headingDifference: compareHeadingDifferenceForLinks(link),
            };
          })
          .filter((link) => link.headingDifference !== Infinity);

        // If no link remains, quit the function
        if (linksForHeadingDifference.length === 0) {
          return;
        }

        // Sort links by headingDifference (ascending order)
        const sortedLinks = linksForHeadingDifference.sort((link1, link2) => {
          return link1.headingDifference - link2.headingDifference;
        });

        // Set next pano ID (location) corresponding to the link closest to the heading direction
        // If handleLinkChangeProps.backward is true, set to the farthest link
        let nextPanoId;
        const sortedLinksLength = sortedLinks.length;
        if (handleLinkChangeProps?.backward) {
          nextPanoId = sortedLinks[sortedLinksLength - 1].pano;
        } else {
          nextPanoId = sortedLinks[0].pano;
        }

        if (nextPanoId) {
          streetViewRef.setPano(nextPanoId);
        }
      }
    };
  };

  // Actual handler functions for forwardToLink/backwardToLink actions
  const handleForwardToLink = handleLinkChange();
  const handleBackwardToLink = handleLinkChange({ backward: true });

  // Async handler function for the captureScene action
  // Note that this handler should run only once for each capture.
  // Therefore it does not use the timer (setActionInterval)
  const handleCaptureScene = async () => {
    resetActionInterval(); // Reset ongoing action

    // If the Street View Div container is unset (unloaded Street View), we cannot capture the scene image
    // Notify error in the Dev console and quit the function
    if (!streetViewDivRef.current) {
      console.error(
        '[StreetView:handleCaptureScene] Street View Div container is unset or undefined.',
      );
      return;
    }

    // Temporarily hide the linksControl UI before capture
    streetViewRef?.setOptions({
      linksControl: false,
    });
    await delay(50);

    // Capture the Div container using html2canvas, then encode the captured canvas as a base64 string
    const capturedCanvas = await html2canvas(streetViewDivRef.current, {
      useCORS: true,
      backgroundColor: null,
    });
    const base64EncodedImageString = capturedCanvas.toDataURL('image/png', 1.0);

    // Show the linksControl UI after capture
    streetViewRef?.setOptions({
      linksControl: true,
    });

    setBase64EncodedImage(base64EncodedImageString);
  };

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
      case 'fowardToLink':
        setActionInterval(
          handleForwardToLink,
          actionHandlerOptions.linkChangeIntervalInMs,
        );
        break;
      case 'backwardToLink':
        setActionInterval(
          handleBackwardToLink,
          actionHandlerOptions.linkChangeIntervalInMs,
        );
        break;
      case 'captureScene':
        handleCaptureScene();
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
