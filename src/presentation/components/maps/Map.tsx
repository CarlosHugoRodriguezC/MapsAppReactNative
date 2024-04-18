import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Location} from '../../../infrastructure/interfaces/location';
import {FAB} from '../ui/Fab';
import {useLocationStore} from '../../stores/location/useLocationStore';

interface Props {
  showsUserLocation?: boolean;
  followsUserLocation?: boolean;
  initialLocation?: Location;
}

export const Map = (props: Props) => {
  const {
    showsUserLocation = true,
    followsUserLocation = true,
    initialLocation = {latitude: 37.78825, longitude: -122.4324},
  } = props;
  const {top} = useSafeAreaInsets();

  const mapRef = useRef<MapView | null>(null);
  const cameraLocation = useRef<Location>(initialLocation);
  const [isFollowingUser, setIsFollowingUser] = useState(followsUserLocation);
  const [isShowingPolyline, setIsShowingPolyline] = useState(true);

  const {
    lastKnownLocation,
    userLocationList,
    getLocation,
    watchLocation,
    clearWatchLocation,
  } = useLocationStore();

  const moveCameraLocation = (location: Location) => {
    if (!mapRef.current) return;

    mapRef.current.animateCamera({
      center: location,
    });
  };

  const moveToCurrentLocation = async () => {
    if (lastKnownLocation) {
      moveCameraLocation(lastKnownLocation);
    }
    const location = await getLocation();
    if (!location) return;

    moveCameraLocation(location);
  };

  useEffect(() => {
    watchLocation();
    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (!lastKnownLocation || !isFollowingUser) return;

    moveCameraLocation(lastKnownLocation);
  }, [lastKnownLocation, isFollowingUser]);

  return (
    <>
      <MapView
        ref={mapRef}
        showsUserLocation={showsUserLocation}
        followsUserLocation={followsUserLocation}
        mapPadding={{top: top, left: 0, right: 0, bottom: 0}}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onTouchMove={() => setIsFollowingUser(false)}>
        {isShowingPolyline && (
          <Polyline
            coordinates={userLocationList}
            strokeColor="red"
            strokeWidth={5}
          />
        )}
      </MapView>
      <FAB
        iconName={isShowingPolyline ? 'eye-outline' : 'eye-off-outline'}
        onPress={() => {
          setIsShowingPolyline(!isShowingPolyline);
        }}
        style={{bottom: 140, right: 20}}
      />
      <FAB
        iconName={
          isFollowingUser ? 'location-outline' : 'accessibility-outline'
        }
        onPress={() => {
          setIsFollowingUser(!isFollowingUser);
        }}
        style={{bottom: 80, right: 20}}
      />
      <FAB
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{bottom: 20, right: 20}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
