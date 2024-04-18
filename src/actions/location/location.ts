import Geolocation from '@react-native-community/geolocation';
import {Location} from '../../infrastructure/interfaces/location';

export const getCurrentLocation = async (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;

        resolve({latitude, longitude});
      },
      error => {
        console.log('Error getting location', error);
        reject(error);
      },
      {enableHighAccuracy: true},
    );
  });
};

export const watchCurrentLocation = (
  locationCallback: (location: Location) => void,
): number => {
  return Geolocation.watchPosition(
    info => {
      const {latitude, longitude} = info.coords;
      return locationCallback({latitude, longitude});
    },
    error => {
      throw new Error("Can't get location");
    },
    {enableHighAccuracy: true},
  );
};

export const clearWatchLocation = (watchId: number) => {
  Geolocation.clearWatch(watchId);
};
