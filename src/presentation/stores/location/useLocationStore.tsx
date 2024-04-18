import {create} from 'zustand';
import {Location} from '../../../infrastructure/interfaces/location';
import {
  getCurrentLocation,
  clearWatchLocation,
  watchCurrentLocation,
} from '../../../actions/location/location';

interface LocationState {
  lastKnownLocation: Location | null;
  userLocationList: Location[];
  watchId: number | null;
  getLocation: () => Promise<Location | null>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  lastKnownLocation: null,
  userLocationList: [],
  watchId: null,
  getLocation: async (): Promise<Location | null> => {
    const location = await getCurrentLocation();
    set({lastKnownLocation: location});
    return location;
  },
  watchLocation: () => {
    const watchId = get().watchId;

    if (watchId) clearWatchLocation(watchId);

    const newWatchId = watchCurrentLocation(location => {
      set({
        lastKnownLocation: location,
        userLocationList: [...get().userLocationList, location],
      });
    });

    set({watchId: newWatchId});
  },
  clearWatchLocation: () => {
    const watchId = get().watchId;
    if (!watchId) return;
    clearWatchLocation(watchId);
  },
}));
