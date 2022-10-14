import { useState } from 'react';
import { useAtom } from 'jotai';

import { cityLatLngPairs } from '../constants';
import {
  googleMapsApiKeyAtom,
  initialLocationAtom,
  initialLocationLatAtom,
  initialLocationLngAtom,
} from '../stores';

import LabeledInput from '../components/LabeledInput';
import CityPicker from '../components/CityPicker';

export default function StartPage() {
  // State for toggle CityPicker / Lat-Lng input component
  const [showCoordinateMenu, setShowCoordinateMenu] = useState(false);

  // States for Street View exploration
  const [googleMapsApikey, setGoogleMapsApiKey] = useAtom(googleMapsApiKeyAtom);
  const [initialLocation, setInitialLocation] = useAtom(initialLocationAtom);
  const [initialLocationLat, setInitialLocationLat] = useAtom(
    initialLocationLatAtom,
  );
  const [initialLocationLng, setInitialLocationLng] = useAtom(
    initialLocationLngAtom,
  );

  return (
    <div className="flex flex-col">
      <div className="text-white mb-6">
        <p className="font-bold text-center text-3xl">
          🗺️ Street View Exploration
        </p>
        <p className="text-right text-xl text-gray-500">(Demo)</p>
      </div>

      <hr className="mb-6" />

      <LabeledInput
        label="Google Map API Key"
        type="text"
        placeholder="Google Map API key"
        className="mb-1"
        value={googleMapsApikey}
        onChange={(event) => {
          setGoogleMapsApiKey(event.target.value);
        }}
      />
      <p
        className="text-red-400 text-right cursor-pointer hover:underline mb-6"
        onClick={() => setGoogleMapsApiKey('')}
      >
        Delete stored API key
      </p>

      {showCoordinateMenu ? (
        <div className="mb-1">
          <LabeledInput
            label="Lat"
            type="number"
            placeholder="Latitude"
            value={initialLocation.latlng.lat}
            onChange={(event) => {
              setInitialLocationLat(Number(event.target.value));
            }}
            className="mb-4"
          />

          <LabeledInput label="Lng" type="number" placeholder="Longitude" />
        </div>
      ) : (
        <CityPicker cityList={cityLatLngPairs} className="mb-1" />
      )}

      <div className="text-white text-right mb-6">
        <label>
          <input
            type="checkbox"
            className="mr-2"
            checked={showCoordinateMenu}
            onChange={() => setShowCoordinateMenu(!showCoordinateMenu)}
          />
          Set coordinates?
        </label>
      </div>

      <hr className="mb-6" />

      <p className="text-bold text-2xl text-white text-right hover:text-yellow-500">
        » ✈️ Explore
      </p>
    </div>
  );
}
