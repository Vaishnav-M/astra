import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const device = useCameraDevice('back');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "This app needs access to your camera to take photos.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        const microphonePermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: "Microphone Permission",
            message: "This app needs access to your microphone to record audio.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (
          cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
          microphonePermission === PermissionsAndroid.RESULTS.GRANTED
        ) {
          setLoading(false);
        } else {
          Alert.alert('Permissions Denied', 'Camera and microphone permissions are required to use this feature.', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ]);
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermissions();
  }, [navigation]);

  const takePhoto = async () => {
    try {
      if (cameraRef.current) {
        const photoTaken = await cameraRef.current.takePhoto({
          qualityPrioritization: 'quality',
        });
        setPhoto(photoTaken.path);
        navigation.navigate('Preview', { photo: photoTaken.path });
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while taking the photo. Please try again.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />;
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No camera device found. Please ensure your device has a camera.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={StyleSheet.absoluteFill} device={device} isActive={true} photo />
      <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
        <Text style={styles.captureButtonText}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    marginTop: 20,
  },
  captureButton: {
    backgroundColor: '#ff4081',
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    left: '50%',
    marginLeft: -35,
    elevation: 5,
  },
  captureButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#d9534f',
    textAlign: 'center',
    margin: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
