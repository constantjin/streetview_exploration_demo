import { useNavigate } from 'react-router-dom';
import {
  Wrapper as GoogleMapWrapper,
  Status as GoogleMapStatus,
} from '@googlemaps/react-wrapper';
import { useAtomValue } from 'jotai';

import {
  googleMapsApiKeyAtom,
  sceneCapturedAtom,
  initialLocationAtom,
  streetViewRefAtom,
} from '../stores';

import StreetViewLoading from '../components/StreetViewLoading';
import StreetViewError from '../components/StreetViewError';
import StreetView from '../components/StreetView';
import KeyboardController from '../components/KeyboardController';
import CapturePreview from '../components/CapturePreview';

const renderMapComponentsByStatus = (status: GoogleMapStatus) => {
  if (status === GoogleMapStatus.FAILURE) {
    return <StreetViewError />;
  }
  return <StreetViewLoading />;
};

export default function Exploration() {
  const googleMapsApiKey = useAtomValue(googleMapsApiKeyAtom);
  const sceneCaptured = useAtomValue(sceneCapturedAtom);

  const initialLocation = useAtomValue(initialLocationAtom);
  const streetViewRef = useAtomValue(streetViewRefAtom);

  const navigate = useNavigate();

  const handleNewCity = () => {
    navigate('/');
  };

  const handleInitialLocation = () => {
    // Run only when the Street View was initialized
    if (streetViewRef) {
      streetViewRef.setPosition(initialLocation.latlng);
    }
  };

  const handleManageComment = () => {
    navigate('/comments');
  };

  return (
    <div>
      <p
        className={`font-light text-white text-center mb-2 ${
          sceneCaptured && 'hidden'
        }`}
      >
        ⌨ [A / D / W / S / F] = ⬅ / ➡ / ⬆ / ⬇ / 📷
      </p>
      <GoogleMapWrapper
        apiKey={googleMapsApiKey}
        version="weekly"
        language="en"
        region="US"
        render={renderMapComponentsByStatus}
      >
        <StreetView />
        {sceneCaptured ? <CapturePreview /> : <KeyboardController />}
      </GoogleMapWrapper>
      {sceneCaptured || (
        <div className="flex flex-col">
          <div className="flex flex-row justify-between mt-2">
            <p className="text-white">
              ✈{' '}
              <span
                className="hover:underline cursor-pointer"
                onClick={handleNewCity}
              >
                New city
              </span>
            </p>
            <p className="text-white">
              🚩
              <span
                className="hover:underline cursor-pointer"
                onClick={handleInitialLocation}
              >
                Initial location
              </span>
            </p>
          </div>
          <div className="w-full mt-2">
            <p className="text-white text-right">
              📖{' '}
              <span
                className="hover:underline cursor-pointer"
                onClick={handleManageComment}
              >
                Manage comments
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
