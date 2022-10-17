export const cityLatLngPairs: ICityLatLngPair[] = [
  {
    city: 'New York',
    latlng: {
      lat: 42.359730801517095,
      lng: -71.05978092045854,
    },
  },
  {
    city: 'Boston',
    latlng: {
      lat: 42.359730801517095,
      lng: -71.05978092045854,
    },
  },
  {
    city: 'Los Angeles',
    latlng: {
      lat: 34.052298818382134,
      lng: -118.24346284307808,
    },
  },
  {
    city: 'London',
    latlng: {
      lat: 51.50753450035801,
      lng: -0.12842994682867678,
    },
  },
  {
    city: 'Paris',
    latlng: {
      lat: 48.85719089933347,
      lng: 2.352774577891171,
    },
  },
];

export const initialPov: google.maps.StreetViewPov = {
  heading: 34,
  pitch: 0,
};

export const initialControlOptions: google.maps.StreetViewPanoramaOptions = {
  panControl: false,
  clickToGo: false,
  disableDoubleClickZoom: true,
  scrollwheel: false,
  linksControl: true,
  showRoadLabels: false,
  disableDefaultUI: true,
};

export const actionHandlerOptions: IActionHandlerOptions = {
  headingChangeAmount: 0.8,
  headingChangeIntervalInMs: 20,
};
