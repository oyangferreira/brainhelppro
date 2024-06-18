import { React, useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {getProInfos} from "../../functions/profissionalfunctions"
import { useNavigation } from '@react-navigation/native';
import Calendar from '../calendar/calendar';
import Settings from '../settings/settings';
const { height, width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Início') {
            iconName = focused ? require('../../assets/img/home.png') : require('../../assets/img/home.png');
          } else if (route.name === 'Agenda') {
            iconName = focused ? require('../../assets/img/calendar.png') : require('../../assets/img/calendar.png');
          } else if (route.name === 'Opções') {
            iconName = focused ? require('../../assets/img/settings.png') : require('../../assets/img/settings.png');
          }

          return <Image source={iconName} style={{ width: size, height: size }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4ED5F9',
        inactiveTintColor: 'gray',
        borderTopColor: 'rgba(128, 128, 128, 0.1)',
        borderTopWidth: 1,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Início" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Agenda" component={Calendar} options={{ headerShown: false }} />
      <Tab.Screen name="Opções" component={Settings} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  const [user, setUser] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [textColor, setTextColor] = useState(isAvailable ? '#FF7800' : 'gray'); // Cor do texto

  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = await getProInfos();
        setUser(u);
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSwitch = () => setIsAvailable((previousState) => !previousState);

  // Função para atualizar a cor do texto com base no estado do switch
  useEffect(() => {
    setTextColor(isAvailable ? '#FF7800' : 'gray');
  }, [isAvailable]);

  const navigation = useNavigation();

  return (
    <View style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../../assets/img/perfil.png')} style={styles.profileIcon} />
          <View style={styles.greetingContainer}>
            {user ? (
              <Text style={styles.greetingText}>
                Olá, <Text style={styles.boldText}>{user.name}</Text>
              </Text>
            ) : (
              <Text style={styles.greetingText}>
                Olá, <Text style={styles.boldText}>Yang</Text>
              </Text>
            )}
          </View>
        </View>
        <View style={styles.availabilityContainer}>
          <Switch
            style={styles.switch}
            trackColor={{ false: '#767577', true: '#FF7800' }}
            thumbColor={isAvailable ? '#ffffff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isAvailable}
          />
          <Text style={[styles.switchText, { color: textColor }]}>
            {isAvailable ? 'Disponível' : 'Indisponível'}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsItem}>
            <Image source={require('../../assets/img/star.png')} style={styles.statsIcon} />
            <Text style={styles.statsNumber}>4.8</Text>
            <Text style={styles.statsLabel}> Avaliações</Text>
          </View>
          <View style={styles.statsItem}>
            <Image source={require('../../assets/img/consult.png')} style={styles.statsIcon} />
            <Text style={styles.statsNumber}>200</Text>
            <Text style={styles.statsLabel}> Consultas Realizadas</Text>
          </View>
        </View>
        <View style={styles.availableConsultations}>
          <Text style={styles.subtitle}>Consultas Disponíveis</Text>
          <TouchableOpacity>
            <Text style={styles.viewMore}>Veja mais</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.consultationBox}>
          <Image source={require('../../assets/img/perfil.png')} style={styles.consultationProfileIcon} />
          <View style={styles.consultationInfo}>
            <Text style={styles.consultationName}>João Silva</Text>
            <Text style={styles.consultationImmediate}>Imediata</Text>
          </View>
          <TouchableOpacity 
            style={styles.acceptButton}
            onPress={() => navigation.navigate('consultationdetails')}
          >
            <Text style={styles.acceptButtonText}>Aceitar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.consultationBox}>
          <Image source={require('../../assets/img/perfil.png')} style={styles.consultationProfileIcon} />
          <View style={styles.consultationInfo}>
            <Text style={styles.consultationName}>Maria Oliveira</Text>
            <Text style={styles.consultationAgendade}>Agendada</Text>
            <Text style={styles.consultationHours}>19:00</Text>
          </View>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Aceitar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.availableConsultations}>
  <Text style={styles.subtitle}>Histórico de Consultas</Text>
  <TouchableOpacity>
    <Text style={styles.viewMore}>Veja mais</Text>
  </TouchableOpacity>
</View>
<View style={styles.consultationBoxInvisible}>
  <Image source={require('../../assets/img/perfil.png')} style={styles.consultationProfileIcon} />
  <View style={styles.consultationInfo}>
    <Text style={styles.consultationName}>João Silva</Text>
    <Text style={styles.consultationHours}>20/05/2023</Text>
  </View>
  {/* Substituir o botão Aceitar por cinco estrelas */}
  <View style={styles.ratingContainer}>
    {[1, 2, 3, 4, 5].map((item, index) => ( 
      <Image
        key={index}
        source={require('../../assets/img/star.png')} // Use uma imagem de estrela preenchida
        style={styles.ratingStar}
      />
    ))}
  </View>
</View>
<View style={styles.consultationBoxInvisible}>
  <Image source={require('../../assets/img/perfil.png')} style={styles.consultationProfileIcon} />
  <View style={styles.consultationInfo}>
    <Text style={styles.consultationName}>Maria Oliveira</Text>
    <Text style={styles.consultationHours}>20/05/2023</Text>
  </View>
  {/* Substituir o botão Aceitar por cinco estrelas */}
  <View style={styles.ratingContainer}>
    {[1, 2, 3, 4, 5].map((item, index) => (
      <Image
        key={index}
        source={require('../../assets/img/star.png')} // Use uma imagem de estrela preenchida
        style={styles.ratingStar}
      />
    ))}
  </View>
</View>
<View style={styles.consultationBoxInvisible}>
  <Image source={require('../../assets/img/perfil.png')} style={styles.consultationProfileIcon} />
  <View style={styles.consultationInfo}>
    <Text style={styles.consultationName}>Maria Oliveira</Text>
    <Text style={styles.consultationHours}>20/05/2023</Text>
  </View>
  {/* Substituir o botão Aceitar por cinco estrelas */}
  <View style={styles.ratingContainer}>
    {[1, 2, 3, 4, 5].map((item, index) => (
      <Image
        key={index}
        source={require('../../assets/img/star.png')} // Use uma imagem de estrela preenchida
        style={styles.ratingStar}
      />
    ))}
  </View>
</View>
        </View>
      </ScrollView>
    </View>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.backgroundTabBar}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tabBarButton}
            >
              <Image
                source={icons[route.name]}
                style={[styles.icon, { tintColor: isFocused ? '#FF7800' : '#BBBBBB' }]}
              />
              <Text style={[styles.label, { color: isFocused ? '#FF7800' : '#BBBBBB' }]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
 
const icons = {
  Início: require('../../assets/img/home.png'),
  Agenda: require('../../assets/img/calendar.png'),
  Opções: require('../../assets/img/settings.png'),
};

const styles = StyleSheet.create({
  ratingContainer: {
  flexDirection: 'row',
  },
  ratingStar: {
    width: 10,
    height: 10, 
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    top: height * 0.03,
  },
  background: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '80%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    top: height * 0.05,
  },
  profileIcon: {
    width: 80,
    height: 80,
  },
  greetingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 28,
    color: '#1D1E1D',
    fontFamily: 'Poppins_400Regular',
    marginHorizontal: 20, 
  },
  boldText: {
    fontFamily: 'Poppins_600SemiBold',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: -10,
  },
  switchText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    top: height * 0.03,
    marginHorizontal: 10, 
  },
  statsContainer: {
    top: height * 0.02,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  statsNumber: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#FF7800',
    marginLeft: 15,
  },
  statsLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#13191B',
    marginLeft: 10,
  },
  statsIcon: {
    width: 30,
    height: 30,
  },
  backgroundTabBar: {
    backgroundColor: '#FFF',
    borderTopColor: 'rgba(128, 128, 128, 0.1)',
    borderTopWidth: 4,
  },
  tabBar: {
    width: '90%',
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  availableConsultations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
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
    borderColor: 'rgba(128, 128, 128, 0.2)', // Borda cinza quase transparente
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    height: 80,
    alignSelf: 'center', // Para centralizar o retângulo
  },
  consultationBoxInvisible: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: 'rgba(128, 128, 128, 0)', // Borda cinza quase transparente
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    // marginVertical: 5,
    width: '100%',
    height: 80,
    alignSelf: 'center', // Para centralizar o retângulo
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
  consultationImmediate: {
    fontSize: 14,
    color: '#FF7800',
    fontFamily: 'Poppins_500Medium',
    marginTop: -5,
  },
  consultationAgendade: {
    fontSize: 14,
    marginTop: -5,
    color: '#13191B',
    fontFamily: 'Poppins_500Medium',
  },
  consultationHours: {
    fontSize: 12,
    color: '#13191B',
    fontFamily: 'Poppins_500Medium',
  },
  acceptButton: {
    backgroundColor: '#FF7800', // Botão laranja
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 25, // Botão arredondado
  },
  acceptButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default Home;
