import {Pressable, Text, View} from 'react-native';
import {globalStyles} from '../../../config/theme/styles';
import {usePermissionStore} from '../../stores/permissions/usePermissionStore';

export const PersmissionsScreen = () => {
  const {locationStatus, requestLocationPermission} = usePermissionStore();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Enable Location</Text>
      <Pressable
        style={globalStyles.btnPrimary}
        onPress={requestLocationPermission}>
        <Text style={{color: 'white'}}>Enable</Text>
      </Pressable>
      <Text>Status: {locationStatus}</Text>
    </View>
  );
};
