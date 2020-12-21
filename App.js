import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Surface } from 'gl-react-expo';
import ImageFilters from 'react-native-gl-image-filters';

export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);
  let [selectedFilter, setSelectedFilter] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  let processImage = () => {
    setSelectedFilter('vintage');
  };

  if (selectedImage !== null) {
    if (selectedFilter !== null) {
      const filters = {
        hue: 0,
        blur: 0,
        sepia: 1,
        sharpen: 0,
        negative: 0,
        contrast: 1,
        saturation: 1,
        brightness: 2,
        temperature: 6500,
        exposure: 0
      };
      return (
        <View style={styles.container}>
          <Surface style={{ width: 300, height: 300 }} ref={ref => (this.image = ref)}>
            <ImageFilters {...filters} width={300} height={300}>
              {{ uri: selectedImage.localUri.replace(/^file:\/+/, 'file:///') }}
            </ImageFilters>
          </Surface>
        </View>
      );  
    }
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail}/>
        <TouchableOpacity onPress={processImage} style={styles.button}>
          <Text style={styles.buttonText}>Process image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Select image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
