import React, { useState, useEffect } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './queryvalue.css';

const QueryValue = ({ navigation }) => {
  const [consultationValue, setConsultationValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  }; 

  const handleNext = async () => {
    if (!isButtonDisabled) {  
      try { 
        let obj = await AsyncStorage.getItem('pro');
        obj = obj ? JSON.parse(obj) : {};

        obj.qvalue = consultationValue;

        await AsyncStorage.setItem('pro', JSON.stringify(obj));
        navigation.navigate('scheduleavailability');
      } catch (error) {
        console.error('Error handling user data:', error);
      }
    } 
  };

  useEffect(() => {
    // Validate form field and update button state
    if (consultationValue.trim() !== '' && parseFloat(consultationValue) >= 1.5) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [consultationValue]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={require('../../assets/img/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Valor da Consulta</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.miniTitle}>Valor por minuto (mínimo de R$1,50) *</Text>
          <TextInput
            placeholder="Digite o valor da consulta"
            placeholderTextColor="#BEBEBE"
            style={styles.input}
            onChangeText={setConsultationValue}
            value={consultationValue}
            keyboardType="numeric"
            borderRadius={10}
          />
          <Text style={styles.note}>Uma taxa de 10% será descontada em cima do valor das consultas realizadas</Text>
        </View> 
      </View>
      {!keyboardVisible && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleNext} style={[styles.nextButton, { opacity: isButtonDisabled ? 0.5 : 1 }]} disabled={isButtonDisabled}>
            <Text style={styles.nextButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View> 
      )}
    </View>
  );
};

export default QueryValue;