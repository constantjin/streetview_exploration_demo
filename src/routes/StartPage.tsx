import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [googleMapsApiKey, setGoogleMapsApiKey] = useAtom(googleMapsApiKeyAtom);
  const [initialLocation, setInitialLocation] = useAtom(initialLocationAtom);
  const [initialLocationLat, setInitialLocationLat] = useAtom(
    initialLocationLatAtom,
  );
  const [initialLocationLng, setInitialLocationLng] = useAtom(
    initialLocationLngAtom,
  );

  // Validate inputs before start
  const [validationErrorMessage, setValidationErrorMessage] = useState('');

  const validateInputBeforeStart = () => {
    if (googleMapsApiKey === '') {
      setValidationErrorMessage('Google Maps API key is empty');
    } else if (
      initialLocationLat < -90 ||
      initialLocationLat > 90 ||
      initialLocationLng < -180 ||
      initialLocationLng > 180
    ) {
      setValidationErrorMessage('Latitude/longitude is invalid');
    } else {
      setValidationErrorMessage('');
      console.log(googleMapsApiKey);
      console.log(initialLocation);
      navigate('/explore');
    }
  };

  // Constants / hooks
  const navigate = useNavigate();

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
        label="Google Maps API Key"
        type="text"
        placeholder="Google Maps API key"
        className="mb-1"
        value={googleMapsApiKey}
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
            label="Latitude"
            type="number"
            placeholder="Latitude"
            value={initialLocationLat}
            onChange={(event) => {
              setInitialLocationLat(Number(event.target.value));
            }}
            className="mb-4"
          />

          <LabeledInput
            label="Longitude"
            type="number"
            placeholder="Longitude"
            value={initialLocationLng}
            onChange={(event) => {
              setInitialLocationLng(Number(event.target.value));
            }}
          />
        </div>
      ) : (
        <CityPicker
          cityList={cityLatLngPairs}
          className="mb-1"
          value={initialLocation.city}
          onChange={(event) => {
            const newInitialLocation =
              cityLatLngPairs.find(
                (pair) => pair.city === event.target.value,
              ) ?? cityLatLngPairs[0];
            setInitialLocation(newInitialLocation);
          }}
        />
      )}

      <div className="text-white text-right mb-6">
        <label>
          <input
            type="checkbox"
            className="mr-2"
            checked={showCoordinateMenu}
            onChange={() => {
              if (showCoordinateMenu) {
                // CoordinateMenu -> CityPicker; initialize with the first city
                setInitialLocation(cityLatLngPairs[0]);
              } else {
                // CityPicker -> CoordinateMenu; Tag an arbitrary city name
                setInitialLocation({ ...initialLocation, city: 'Coordinates' });
              }
              // Toggle Coordinate Menu
              setShowCoordinateMenu(!showCoordinateMenu);
            }}
          />
          Set coordinates?
        </label>
      </div>

      <hr className="mb-4" />
      {validationErrorMessage !== '' && (
        <p className="text-red-500 text-right mb-2">
          ❌ {validationErrorMessage}
        </p>
      )}
      <p
        className="text-bold text-2xl text-white text-right hover:text-yellow-500 cursor-pointer"
        onClick={validateInputBeforeStart}
      >
        » ✈️ Explore
      </p>
    </div>
  );
}
