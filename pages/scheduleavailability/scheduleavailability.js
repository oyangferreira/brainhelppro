import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from './scheduleavailability.css';
import AsyncStorage from '@react-native-async-storage/async-storage';   

const daysOfWeek = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
];

const ScheduleAvailability = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [availability, setAvailability] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };
 
  const handleNext = async() => {
     try {
        let obj = await AsyncStorage.getItem('pro');
        obj = obj ? JSON.parse(obj) : {};

        obj.availability = availability;

        await AsyncStorage.setItem('pro', JSON.stringify(obj));
        
        navigation.navigate('uploadphoto');
      } catch (error) {
        alert('Erro ao salvar dados: ' + error.message);
      }
    
  };

  const handleDayPress = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const formatTime = (time) => {
    if (time.length === 2) {
      return `${time}:`;
    }
    return time;
  };

  const handleConfirmTime = () => {
    if (!startTime || !endTime || startTime.length < 5 || endTime.length < 5) {
      return; // Ensure both start and end times are provided and properly formatted
    }

    const updatedAvailability = { ...availability };
    if (!updatedAvailability[selectedDay]) {
      updatedAvailability[selectedDay] = [];
    }
    updatedAvailability[selectedDay].push(`${startTime} - ${endTime}`);
    setAvailability(updatedAvailability);
    setModalVisible(false);
    setStartTime('');
    setEndTime('');
  };

  const handleDeleteTime = (day, index) => {
    const updatedAvailability = { ...availability };
    updatedAvailability[day].splice(index, 1);
    if (updatedAvailability[day].length === 0) {
      delete updatedAvailability[day];
    }
    setAvailability(updatedAvailability);
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Image source={require('../../assets/img/back.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Disponibilidade de Horário</Text>
          <Text style={styles.subtitle}>Consultas variam de 10 à 120 minutos</Text>
    
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day, index) => (
              <React.Fragment key={index}>
                <View style={styles.dayRow}>
                  <TouchableOpacity onPress={() => handleDayPress(day)} style={styles.dayButton}>
                    <Text style={styles.dayLabel}>{day}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDayPress(day)}>
                    <Image source={require('../../assets/img/add.png')} style={styles.addIcon} />
                  </TouchableOpacity>
                </View>
                {availability[day] && availability[day].map((timeSlot, idx) => (
                  <View key={idx} style={styles.timeRow}>
                    <Text style={styles.timeLabel}>{timeSlot}</Text>
                    <TouchableOpacity onPress={() => handleDeleteTime(day, idx)}>
                      <Image source={require('../../assets/img/delete.png')} style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>
                ))}
                <View style={styles.divider} />
              </React.Fragment>
            ))}
          </View>
  
          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Adicionar Horário</Text>
                <TextInput
                  placeholder="00:00"
                  style={styles.input}
                  value={startTime}
                  onChangeText={(text) => setStartTime(formatTime(text))}
                  keyboardType="numeric"
                  maxLength={5}
                />  
                <TextInput 
                  placeholder="00:00"
                  style={styles.input}
                  value={endTime}
                  onChangeText={(text) => setEndTime(formatTime(text))}
                  keyboardType="numeric"
                  maxLength={5} 
                />
                <TouchableOpacity onPress={handleConfirmTime} style={styles.confirmButton}>
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleNext} style={[styles.nextButton, !isButtonDisabled && styles.enabledButton]}>
          <Text style={styles.nextButtonText}>Continuar</Text> 
        </TouchableOpacity>   
      </View> 
    </View>
  );
};

export default ScheduleAvailability;
