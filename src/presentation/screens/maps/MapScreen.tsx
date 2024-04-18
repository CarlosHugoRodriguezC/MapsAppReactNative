import {StyleSheet, View} from 'react-native';
import {Map} from '../../components/maps/Map';
import {useLocationStore} from '../../stores/location/useLocationStore';
import {LoadingScreen} from '../loading/LoadingScreen';
import {useEffect} from 'react';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import {FAB} from '../../components/ui/Fab';

export const MapScreen = () => {
  const {lastKnownLocation} = useLocationStore();

  useEffect(() => {
    useLocationStore.getState().getLocation();
  }, []);

  if (!lastKnownLocation) {
    return <FullScreenLoader />;
  }

  return (
    <View style={styles.container}>
      <Map initialLocation={lastKnownLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
