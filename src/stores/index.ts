import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const googleMapsApiKeyAtom = atomWithStorage('googleMapsApiKey', '');

export const initialLocationAtom = atom<ICityLatLngPair>({
  city: '',
  latlng: { lat: 0, lng: 0 },
});
