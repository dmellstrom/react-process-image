import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true});
    if (pickerResult.cancelled === true) {
      return;
    }

    if (pickerResult.base64) {
      setSelectedImage({ localUri: 'data:image/jpeg;base64,' + pickerResult.base64 });
    } else {
      setSelectedImage({ localUri: pickerResult.uri }); // Workaround for web for expo/expo#9984
    }
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail}/>
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
