import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const cargarYRedirigir = async () => {
      const evento = await AsyncStorage.getItem('eventoSeleccionado');

      // Esperamos animación ~2.5s
      setTimeout(() => {
        if (evento) {
          navigation.replace('Main'); // Va a la app principal
        } else {
          navigation.replace('Home'); // Va a seleccionar evento
        }
      }, 2500);
    };

    cargarYRedirigir();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/splash.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 250,
    height: 250,
  },
});
