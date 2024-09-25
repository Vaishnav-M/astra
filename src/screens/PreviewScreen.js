import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import RNFS from 'react-native-fs';

const PreviewScreen = ({ route, navigation }) => {
  const { photo } = route.params;
  const [shape, setShape] = useState(null);

  // Function to detect the shape from the photo
  const analyzeShape = async () => {
    try {
      // Placeholder for basic shape analysis algorithm
      const analyzedShape = detectShape(photo);
      setShape(analyzedShape);
      Alert.alert('Shape Detected', `Detected Shape: ${analyzedShape}`);
    } catch (error) {
      Alert.alert('Error', 'Could not analyze the shape. Please try again.');
    }
  };

  // Improved shape detection logic based on width-to-height ratio
  const detectShape = (photoPath) => {
    const imageWidth = 1080;  // Example image width (you should fetch this from the image metadata)
    const imageHeight = 720;  // Example image height (you should fetch this from the image metadata)
    const aspectRatio = imageWidth / imageHeight;

    // Define tolerance to handle imperfections
    const tolerance = 0.05;

    // Check if the width and height are almost equal (for square detection)
    if (Math.abs(imageWidth - imageHeight) <= imageWidth * tolerance) {
      return 'Square';
    }
    // Check for rectangle shape
    else if (aspectRatio > 1 + tolerance) {
      return 'Wide Rectangle';
    } else if (aspectRatio < 1 - tolerance) {
      return 'Tall Rectangle';
    }
    // Check for circle shape based on a basic approximation (ratio near 1 but with rounded edges)
    else if (aspectRatio >= 1 - tolerance && aspectRatio <= 1 + tolerance) {
      return 'Circle';
    } else {
      return 'Unknown Shape';
    }
  };

  const savePhoto = async () => {
    const path = `${RNFS.PicturesDirectoryPath}/myPhoto.jpg`;
    try {
      await RNFS.moveFile(photo, path);
      Alert.alert('Success', 'Photo saved to gallery!', [{ text: 'OK', onPress: () => navigation.navigate('Home') }]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save photo. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: `file://${photo}` }} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={savePhoto}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={analyzeShape}
        >
          <Text style={styles.buttonText}>Analyze Shape</Text>
        </TouchableOpacity>
      </View>
      {shape && (
        <Text style={styles.shapeText}>
          Detected Shape: {shape}
        </Text>
      )}
    </View>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  image: {
    width: '90%',
    height: '60%',
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'contain',  // Makes the image fit nicely within the view
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shapeText: {
    color: '#6200ee',
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
