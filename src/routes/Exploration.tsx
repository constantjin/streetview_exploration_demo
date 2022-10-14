import { useEffect } from 'react';
import {
  Wrapper as GoogleMapWrapper,
  Status as GoogleMapStatus,
} from '@googlemaps/react-wrapper';
import { useAtomValue } from 'jotai';

import { googleMapsApiKeyAtom } from '../stores';

import StreetViewLoading from '../components/StreetViewLoading';
import StreetViewError from '../components/StreetViewError';
import StreetView from '../components/StreetView';
import KeyboardController from '../components/KeyboardController';

const renderMapComponentsByStatus = (status: GoogleMapStatus) => {
  if (status === GoogleMapStatus.FAILURE) {
    return <StreetViewError />;
  }
  return <StreetViewLoading />;
};

export default function Exploration() {
  const googleMapsApiKey = useAtomValue(googleMapsApiKeyAtom);

  return (
    <div>
      <GoogleMapWrapper
        apiKey={googleMapsApiKey}
        version="weekly"
        language="en"
        region="US"
        render={renderMapComponentsByStatus}
      >
        <StreetView />
        <KeyboardController />
      </GoogleMapWrapper>
    </div>
  );
}
