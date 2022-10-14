import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { focusAtom } from 'jotai/optics';

import { cityLatLngPairs } from '../constants';

export const googleMapsApiKeyAtom = atomWithStorage('googleMapsApiKey', '');

// Initialize initialLocationAtom with the first city
export const initialLocationAtom = atom<ICityLatLngPair>(cityLatLngPairs[0]);

export const initialLocationLatAtom = focusAtom(initialLocationAtom, (optic) =>
  optic.prop('latlng').prop('lat'),
);

export const initialLocationLngAtom = focusAtom(initialLocationAtom, (optic) =>
  optic.prop('latlng').prop('lng'),
);

export const streetViewRefAtom = atom<
  undefined | google.maps.StreetViewPanorama
>(undefined);
