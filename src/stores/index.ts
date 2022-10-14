import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { focusAtom } from 'jotai/optics';

export const googleMapsApiKeyAtom = atomWithStorage('googleMapsApiKey', '');

export const initialLocationAtom = atom<ICityLatLngPair>({
  city: '',
  latlng: { lat: 0, lng: 0 },
});

export const initialLocationLatAtom = focusAtom(initialLocationAtom, (optic) =>
  optic.prop('latlng').prop('lat'),
);

export const initialLocationLngAtom = focusAtom(initialLocationAtom, (optic) =>
  optic.prop('latlng').prop('lng'),
);
