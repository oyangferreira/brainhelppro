// ForgotPassword.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import styles from './forgotpassword.css';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
  if (!isButtonDisabled) {
    navigation.navigate('codeverification', { email: email }); 
  }
};
  const handleEmailChange = (text) => {
    setEmail(text);
    setIsButtonDisabled(text === '');
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
          <Text style={styles.title}>Recuperar senha</Text>
          <Text style={styles.text}>Para sua segurança, enviaremos um código para validar sua redefinição de senha.</Text>  
          <Text style={styles.miniTitle}>Email</Text>
          <View style={styles.formContainer}>        
            <TextInput
              placeholder="Digite seu email" 
              placeholderTextColor="#BEBEBE"
              style={styles.input}
              onChangeText={handleEmailChange}
              value={email}  
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

export default ForgotPassword;
