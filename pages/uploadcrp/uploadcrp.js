import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import styles from './uploadcrp.css';

const UploadCrp = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { width, height } = Dimensions.get('window');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLaunchCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImage(result.uri);
        navigation.navigate('specialties');
      }
    } else {
      Alert.alert('Permissão negada', 'É necessário permitir o acesso à câmera para tirar uma foto.');
    }   
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={require('../../assets/img/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Envie o seu CRP</Text>
        <Text style={styles.text}>
          Tire uma foto em um ambiente com boa iluminação para que as informações possam ser bem visualizadas.
        </Text>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/img/crp.png')} style={styles.crpImage} />
        </View>
        {selectedImage && ( 
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        )}       
      </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLaunchCamera} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Tirar uma foto</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default UploadCrp;
