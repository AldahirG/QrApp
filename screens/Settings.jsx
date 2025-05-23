import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../config';
import { useThemeColors } from '../theme/colors';

const Settings = () => {
  const [eventoSeleccionado, setEventoSeleccionado] = useState('');
  const [todosEventos, setTodosEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animacionVisible, setAnimacionVisible] = useState(false);
  const navigation = useNavigation();
  const colors = useThemeColors();

  useEffect(() => {
    cargarEventoActual();
    cargarTodosLosEventos();
  }, []);

  const cargarEventoActual = async () => {
    const evento = await AsyncStorage.getItem('eventoSeleccionado');
    setEventoSeleccionado(evento || '');
  };

  const cargarTodosLosEventos = async () => {
    try {
      const mes = await AsyncStorage.getItem('mesSeleccionado');
      const res = await fetch(`${BASE_URL}/api/registros/eventos/por-mes?mes=${mes}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setTodosEventos(data.map(e => e.Conferencista));
      }
    } catch (error) {
      console.error('Error cargando eventos:', error);
    }
  };

  const actualizarEvento = async () => {
    if (!eventoSeleccionado) return;

    setLoading(true);
    await AsyncStorage.setItem('eventoSeleccionado', eventoSeleccionado);
    setAnimacionVisible(true);

    setTimeout(() => {
      setAnimacionVisible(false);
      navigation.replace('MainTabs', { screen: 'Home' });
    }, 2200);
  };

  return (
    <ImageBackground source={require('../assets/banner.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.header, { color: colors.primary }]}>Configuración</Text>

        <Text style={[styles.label, { color: colors.text }]}>Cambiar Evento Activo:</Text>

        <View style={[styles.pickerContainer, { backgroundColor: colors.card }]}>
          <Picker
            selectedValue={eventoSeleccionado}
            onValueChange={(value) => setEventoSeleccionado(value)}
            style={{ color: colors.text }}
            dropdownIconColor={colors.text}
          >
            {todosEventos.map((evento, idx) => (
              <Picker.Item key={idx} label={evento} value={evento} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={actualizarEvento}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Actualizando...' : 'Actualizar Evento'}
          </Text>
        </TouchableOpacity>

        {/* Modal de animación */}
        <Modal visible={animacionVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <LottieView
              source={require('../assets/animations/done.json')}
              autoPlay
              loop={false}
              style={styles.animation}
            />
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  pickerContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    marginBottom: 30,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: width * 0.5,
    height: width * 0.5,
  },
});

export default Settings;
