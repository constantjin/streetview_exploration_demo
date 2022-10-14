import { useEffect, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { initialPov, initialControlOptions } from '../constants';
import { initialLocationAtom, streetViewRefAtom } from '../stores';

export default function StreetView() {
  const streetViewDivRef = useRef<HTMLDivElement>(null);
  const initialLocation = useAtomValue(initialLocationAtom);
  const setStreetViewRef = useSetAtom(streetViewRefAtom);

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

  return (
    <div
      ref={streetViewDivRef}
      id="streetview"
      style={{ width: '800px', height: '600px' }}
    />
  );
}
