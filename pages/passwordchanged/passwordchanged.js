import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import styles from './passwordchanged.css';

const PasswordChanged = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('home');
  };

  return ( 
    <View style={styles.background}>
      <View style={styles.container}>
        
        <View style={styles.imgContainer}>
          <Image source={require('../../assets/img/correct.png')} style={styles.correctImage} />
        </View> 
        <Text style={styles.title}>A senha foi alterada com sucesso!</Text>
        <Text style={styles.text}>Deu tudo certo!</Text>
        <Text style={styles.textTwo}>Agora você pode acessar novamente o aplicativo e ajudar milhares de pacientes.</Text>
      </View> 
      <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Continuar</Text> 
            </TouchableOpacity>
          </View>
    </View>  
  );     
};   

export default PasswordChanged;        
   