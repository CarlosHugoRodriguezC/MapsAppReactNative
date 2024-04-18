import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './presentation/navigation/StackNavigator';
import CustomStatuBar from './presentation/components/ui/CustomStatuBar';
import {PermissionsChecker} from './presentation/providers/PermissionsChecker';

export const MapApp = () => {
  return (
    <NavigationContainer>
      <PermissionsChecker>
        <CustomStatuBar />
        <StackNavigator />
      </PermissionsChecker>
    </NavigationContainer>
  );
};
