/// <reference types="vite/client" />

interface ILatLng {
  lat: number;
  lng: number;
}

interface ICityLatLngPair {
  city: string;
  latlng: ILatLng;
}
