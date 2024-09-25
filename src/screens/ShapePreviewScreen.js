import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

const ShapePreviewScreen = ({ route, navigation }) => {
  const { photo, shape } = route.params;

  const saveShape = () => {
    Alert.alert('Shape Saved', `The detected shape is a ${shape}!`);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: `file://${photo}` }} />
      <Text style={styles.shapeText}>Detected Shape: {shape}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={saveShape}>
          <Text style={styles.buttonText}>Save Shape</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShapePreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '80%',
    borderRadius: 15,
    marginBottom: 20,
  },
  shapeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
