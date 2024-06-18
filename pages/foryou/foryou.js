import React, { useState, useEffect } from 'react';
import {addProfissional} from "../../fetcher/profissionalapi"
import { Image, View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './foryou.css'; 

const ForYou = ({ navigation }) => {
  const [formation, setFormation] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [crp, setCRP] = useState('');
  const [ePsi, setEPsi] = useState('');
  const [resume, setResume] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [resumeHeight, setResumeHeight] = useState(100); // Initial height of resume input

  const handleBack = () => {
    navigation.goBack();
  };
 
  const handleNext = async () => {
    if (!isButtonDisabled) {
      try {
        let obj = await AsyncStorage.getItem('pro');
        obj = obj ? JSON.parse(obj) : {};

        obj.formation = formation;
        obj.experienceYears = experienceYears;
        obj.crp = crp;
        obj.ePsi = ePsi;
        obj.resume = resume;

        await AsyncStorage.setItem('pro', JSON.stringify(obj));
        
        navigation.navigate('uploadcrp');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  useEffect(() => {
    // Validate form fields and update button state
    if (formation.trim() !== '' && experienceYears.trim() !== '' && crp.trim() !== '' && ePsi.trim() !== '' && resume.trim() !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formation, experienceYears, crp, ePsi, resume]);

  const formatCRP = (input) => {
    // Function to format CRP as 00/000000
    let cleaned = input.replace(/\D/g, '');
    if (cleaned.length > 2) {
      cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    if (cleaned.length > 9) {
      cleaned = cleaned.slice(0, 9);
    }
    return cleaned;     
  };  

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Image source={require('../../assets/img/back.png')} style={styles.backIcon} />
            </TouchableOpacity>
          <Text style={styles.title}>Sobre Você</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.miniTitleFormation}>Formação *</Text>
            <TextInput
              placeholder="Digite sua formação"
              placeholderTextColor="#BEBEBE"
              style={styles.inputFormation}
              onChangeText={setFormation}
              value={formation}
              borderRadius={10}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.miniTitleExperience}>Anos de Experiência *</Text>
            <TextInput
              placeholder="Digite seus anos de experiência"
              placeholderTextColor="#BEBEBE"
              style={styles.inputExperience}
              onChangeText={setExperienceYears}
              value={experienceYears}
              keyboardType="numeric"
              borderRadius={10}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.miniTitleCrp}>CRP *</Text>
            <TextInput
              placeholder="00/000000"
              placeholderTextColor="#BEBEBE"
              style={styles.inputCrp}
              onChangeText={(text) => setCRP(formatCRP(text))}
              value={crp}
              keyboardType="numeric"
              maxLength={9} // Limit the maximum number of characters
              borderRadius={10}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.miniTitleEpsi}>E-Psi *</Text>
            <TextInput
              placeholder="Digite seu E-Psi"
              placeholderTextColor="#BEBEBE"
              style={styles.inputEpsi}
              onChangeText={setEPsi}
              value={ePsi}
              borderRadius={10}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.miniTitleVitae}>Resumo do Currículo *</Text>
            <TextInput
              placeholder="Digite um resumo do seu currículo"
              placeholderTextColor="#BEBEBE"
              style={styles.inputVitae}
              onChangeText={setResume} 
              value={resume}
              multiline={true}
              onContentSizeChange={(event) => setResumeHeight(event.nativeEvent.contentSize.height)}
              borderRadius={10}    
            />
            </View>
          </View>   
          </ScrollView>
          {!keyboardVisible && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNext} style={[styles.nextButton, isButtonDisabled && styles.disabledButton]} disabled={isButtonDisabled}>
              <Text style={[styles.nextButtonText, isButtonDisabled && styles.disabledButtonText]} disabled={isButtonDisabled}>Continuar</Text> 
            </TouchableOpacity>   
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}; 

export default ForYou;
