import React from 'react';
import {StatusBar} from 'react-native';

export default function CustomStatuBar() {
  return (
    <StatusBar
      barStyle={'dark-content'}
      backgroundColor={'transparent'}
      translucent
      animated
    />
  );
}
