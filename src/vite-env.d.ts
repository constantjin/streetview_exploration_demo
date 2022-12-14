/// <reference types="vite/client" />
interface ILatLng {
  lat: number;
  lng: number;
}

interface ICityLatLngPair {
  city: string;
  latlng: ILatLng;
}

type ControllerAction =
  | 'stopAction'
  | 'fowardToLink'
  | 'backwardToLink'
  | 'headingToLeft'
  | 'headingToRight'
  | 'captureScene';

interface IActionHandlerOptions {
  headingChangeAmount: number;
  headingChangeIntervalInMs: number;
  linkChangeIntervalInMs: number;
}

interface IStreetViewComment {
  timestamp: string;
  id: string;
  city: string;
  comment: string;
  latLngString: string;
  heading: number;
}
