// CodeVerification.js
import React, { useState, useRef, useEffect } from 'react'; // Importando useRef
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import styles from './codeverification.css';

const CodeVerification = ({ navigation, route }) => {
  const { email } = route.params;

  const [code, setCode] = useState(['', '', '', '']); // Alterando para um array de 4 posições
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const inputRefs = useRef([...Array(4)].map(() => React.createRef())); // Criando refs para os campos

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = () => {
    if (!isButtonDisabled) {
      navigation.navigate('resetpassword', { email: email });
    }
  };

  const handleCodeChange = (index, text) => { 
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);  
  
    if (text.length === 1 && index < 3) {
      // Movendo o foco para o próximo campo
      inputRefs.current[index + 1].current.focus();
    }

    setIsButtonDisabled(newCode.some((value) => value.length !== 1));
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.background}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.container}
        >
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Image source={require('../../assets/img/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Código de verificação</Text>
          <Text style={styles.text}>Insira o código de verificação enviado para {email}.</Text>
          <View style={styles.codeContainer}>
            {code.map((value, index) => (
              <TextInput 
                key={index}
                ref={inputRefs.current[index]} // A ssociando a ref ao campo
                style={styles.codeInput}   
                maxLength={1} 
                keyboardType="numeric"
                onChangeText={(text) => handleCodeChange(index, text)}
                value={value}
              /> 
            ))}
          </View>  
        </KeyboardAvoidingView>
        {!keyboardVisible && (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNext} style={[styles.nextButton, { opacity: isButtonDisabled ? 0.5 : 1 }]} disabled={isButtonDisabled}>
              <Text style={styles.nextButtonText}>Continuar</Text>
            </TouchableOpacity>
            </View>
          )} 
      </ScrollView>
    </SafeAreaView>
  );
};

export default CodeVerification;
