import React, { useState } from 'react';
import { Image, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';   
import styles from './specialties.css';

const specialtiesList = [
  'Neuropsicologia',
  'Psicologia Ambiental',
  'Psicologia Analítica',
  'Psicologia Bioenergética',
  'Psicologia Clínica',
  'Psicologia Cognitiva',
  'Psicologia Comparativa',
  'Psicologia Comportamental',
  'Psicologia Comunitária',
  'Psicologia Cultural',
  'Psicologia da Arte',
  'Psicologia da Comunicação',
  'Psicologia da Criança e do Adolescente',
  'Psicologia da Educação',
  'Psicologia da Família',
  'Psicologia da Felicidade',
  'Psicologia da Gestalt',
  'Psicologia da Linguagem',
  'Psicologia da Medição',
  'Psicologia da Música',
  'Psicologia da Personalidade',
  'Psicologia da Qualidade de Vida',
  'Psicologia do Desenvolvimento',
  'Psicologia do Desenvolvimento Humano',
  'Psicologia do Envelhecimento',
  'Psicologia do Esporte',
  'Psicologia do Esporte e do Exercício',
  'Psicologia do Testemunho',
  'Psicologia do Trauma',
  'Psicologia do Trabalho',
  'Psicologia do Trânsito',
  'Psicologia Econômica',
  'Psicologia Educacional',
  'Psicologia Escolar',
  'Psicologia Esportiva',
  'Psicologia Evolutiva',
  'Psicologia Existencial',
  'Psicologia Experimental', 
  'Psicologia Feminista',
  'Psicologia Forense',
  'Psicologia Gerontológica',
  'Psicologia Humanista',
  'Psicologia Humanista-Existencial',
  'Psicologia Intercultural',
  'Psicologia Jurídica',
  'Psicologia Militar',
  'Psicologia Organizacional',
  'Psicologia Organizacional e do Trabalho',
  'Psicologia Pastoral',
  'Psicologia Política',
  'Psicologia Positiva',
  'Psicologia Psicossomática', 
  'Psicologia Religiosa',
  'Psicologia Sistêmica',
  'Psicologia Social',
  'Psicologia Transpessoal',
  'Psicopedagogia',
  'Psicomotricidade',
];
const Specialties = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleBack = () => { 
    navigation.goBack(); 
  };

  const handleCheckboxPress = (option) => {
    let updatedOptions = [...selectedOptions];

    if (updatedOptions.includes(option)) {
      updatedOptions = updatedOptions.filter((item) => item !== option);
    } else {
      updatedOptions.push(option);
    }

    setSelectedOptions(updatedOptions);
  };

  const handleContinue = async () => {
    if (selectedOptions.length >= 3) {
      try {
        let obj = await AsyncStorage.getItem('pro');
        obj = obj ? JSON.parse(obj) : {};

        obj.specialties = selectedOptions;

        await AsyncStorage.setItem('pro', JSON.stringify(obj));
        
        navigation.navigate('queryvalue');
      } catch (error) {
        alert('Erro ao salvar dados: ' + error.message);
      }
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image source={require('../../assets/img/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Selecione até 3 especialidades</Text>

        <ScrollView style={styles.checkboxContainer}>
          {specialtiesList.map((specialty, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity style={styles.checkboxRow} onPress={() => handleCheckboxPress(specialty)}>
                <Image source={selectedOptions.includes(specialty) ? require('../../assets/img/checked.png') : require('../../assets/img/nochecked.png')} style={styles.checkbox} />
                <Text style={styles.checkboxLabel}>{specialty}</Text>
              </TouchableOpacity> 
              <View style={styles.divider} />
            </React.Fragment>
          ))}
        </ScrollView>           
      </View>
      <View style={styles.buttonContainer}> 
        <TouchableOpacity
          style={[
            styles.nextButton,
            selectedOptions.length < 3 ? styles.disabledButton : null,
            selectedOptions.length < 3 ? { opacity: 0.5 } : null,
          ]}
          disabled={selectedOptions.length < 3} 
          onPress={handleContinue}
        >
          <Text style={styles.nextButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Specialties;