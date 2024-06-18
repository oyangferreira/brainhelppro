import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';

const { height, width } = Dimensions.get('window');

const ConsultationDetails = ( {navigation} ) => {
  const [isLoadingCall, setIsLoadingCall] = useState(false);
  const [callStarted, setCallStarted] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);

  const handleBack = () => { 
    navigation.navigate('home'); 
  };

  const handleAccept = async () => {
    setIsLoadingCall(true);

    // Simular a espera pela chamada de vídeo por 3 segundos
    setTimeout(() => {
      setIsLoadingCall(false);
      startCall();
    }, 3000);
  };

  const startCall = async () => {
    const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    const pc = new RTCPeerConnection(configuration);

    const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
    setLocalStream(stream);

    pc.addStream(stream);

    pc.onaddstream = (event) => {
      setRemoteStream(event.stream);
    };

    setPeerConnection(pc);
    setCallStarted(true);
  };

  return (
    <View style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image source={require('../../assets/img/perfil.png')} style={styles.profileImage} />
            <View>
              <Text style={styles.profileName}>Nome do Usuário</Text>
              <Text style={styles.profileAge}>Idade</Text>
            </View>
          </View>

          {/* Títulos das seções */}
          <View style={styles.sectionTitles}>
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTextOne}>Consultas</Text>
                <Text style={styles.sectionText}>156</Text>
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTextOne}>Urgência</Text>
                <Text style={styles.sectionText}>Baixa</Text>
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTextOne}>PCD</Text>
                <Text style={styles.sectionText}>Não</Text>
              </View>
            </View>
          </View>

          {/* Histórico de consultas */}
          <View style={styles.consultationHistory}>
            <Text style={styles.subtitle}>Relatórios</Text>
          </View>
          
          {/* Consultas */}
          <View style={styles.consultationBox}>
            <Image source={require('../../assets/img/perfil.png')} style={styles.consultationProfileIcon} />
            <View style={styles.consultationInfo}>
              <Text style={styles.consultationName}>João Silva</Text>
              <Text style={styles.consultationHours}>20/05/2023</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewMore}>Veja mais</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.consultationBox}>
            <Image source={require('../../assets/img/perfil.png')} style={styles.consultationProfileIcon} />
            <View style={styles.consultationInfo}>
              <Text style={styles.consultationName}>Maria Oliveira</Text>
              <Text style={styles.consultationHours}>20/05/2023</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewMore}>Veja mais</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.consultationBox}>
            <Image source={require('../../assets/img/perfil.png')} style={styles.consultationProfileIcon} />
            <View style={styles.consultationInfo}>
              <Text style={styles.consultationName}>Maria Oliveira</Text>
              <Text style={styles.consultationHours}>20/05/2023</Text>
            </View> 
            <TouchableOpacity>
              <Text style={styles.viewMore}>Veja mais</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.consultationBox}>
            <Image source={require('../../assets/img/perfil.png')} style={styles.consultationProfileIcon} />
            <View style={styles.consultationInfo}>
              <Text style={styles.consultationName}>Maria Oliveira</Text>
              <Text style={styles.consultationHours}>20/05/2023</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.viewMore}>Veja mais</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.refuseButton}>
          <Text style={styles.refuseButtonText}>Recusar Consulta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.acceptButtonText}>Aceitar</Text>
        </TouchableOpacity>
      </View>

      {/* Tela de carregamento */}
      {isLoadingCall && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF7800" />
          <Text style={styles.loadingText}>Estabelecendo contato com o paciente...</Text>
        </View>
      )}

      {/* Chamada de vídeo */}
      {callStarted && (
        <View style={styles.videoContainer}>
          <RTCView streamURL={localStream && localStream.toURL()} style={styles.localVideo} />
          <RTCView streamURL={remoteStream && remoteStream.toURL()} style={styles.remoteVideo} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '80%',
    alignSelf: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  profileName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginHorizontal: 20,
  },
  profileAge: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginHorizontal: 20,
  },
  sectionTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  section: {
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
    width: '30%', 
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sectionTitleContainer: {
    alignItems: 'center',
  },
  sectionTextOne: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#6D7F81',
  },
  sectionText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  consultationHistory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  viewMore: {
    fontSize: 12,
    color: '#FF7800',
    fontFamily: 'Poppins_500Medium',
  },
  consultationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: 'rgba(128, 128, 128, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    height: 80,
    alignSelf: 'center',
  },
  consultationProfileIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  consultationInfo: {
    flex: 1,
  },
  consultationName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: "#13191B",
  },
  consultationHours: {
    fontSize: 12,
    color: '#13191B',
    fontFamily: 'Poppins_500Medium',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height * 0.05,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  refuseButton: {
    borderWidth: 1,
    borderColor: '#FF7800',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  refuseButtonText: {
    color: '#FF7800',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    padding: 1,
    fontFamily: 'Poppins_600SemiBold',
  },
  acceptButton: {
    backgroundColor: '#FF7800',
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    width: '80%',
    alignSelf: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    padding: 1,
    fontFamily: 'Poppins_600SemiBold',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    color: '#FFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  localVideo: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 120,
    height: 160,
    zIndex: 1,
  },
  remoteVideo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 120,
    height: 160,
  },
});

export default ConsultationDetails;

