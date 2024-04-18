import React, {PropsWithChildren, useEffect} from 'react';
import {AppState, Platform} from 'react-native';
import {usePermissionStore} from '../stores/permissions/usePermissionStore';
import {useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

export const PermissionsChecker = ({children}: PropsWithChildren) => {
  const {locationStatus, checkLocationPermission} = usePermissionStore();

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  useEffect(() => {
    const timmer = setTimeout(() => {
      if (locationStatus === 'granted') {
        navigation.reset({routes: [{name: 'MapScreen'}]});
      } else if (locationStatus !== 'undetermined') {
        navigation.reset({routes: [{name: 'PermissionsScreen'}]});
      }
    }, 1000);

    return () => {
      clearTimeout(timmer);
    };
  }, [locationStatus]);

  useEffect(() => {
    Platform.OS === 'ios' &&
      checkLocationPermission().then(
        status => {
          console.log('Location permission checked, status:', status);
        },
        error => {
          console.log('Location permission checked, error:', error);
        },
      );
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkLocationPermission().then(
          status => {
            console.log('Location permission checked, status:', status);
          },
          error => {
            console.log('Location permission checked, error:', error);
          },
        );
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <>{children}</>;
};
