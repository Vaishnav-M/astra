// App.js

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import PreviewScreen from './src/screens/PreviewScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'ASTRA'}} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{title: 'Capture Photo'}} />
        <Stack.Screen name="Preview" component={PreviewScreen} options={{title: 'Photo Preview'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
