import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { getEventoSeleccionado, clearEventoSeleccionado } from '../utils/storage';

export default function Settings({ navigation }) {
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    getEventoSeleccionado().then(setEvento);
  }, []);

  const cambiarEvento = () => {
    Alert.alert(
      'Cambiar evento',
      '¿Deseas reiniciar la selección de evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aceptar',
          onPress: async () => {
            await clearEventoSeleccionado();
            navigation.replace('Home');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <Text style={styles.label}>Evento seleccionado:</Text>
      <Text style={styles.value}>{evento || 'Ninguno'}</Text>

      <Button mode="contained" style={styles.button} onPress={cambiarEvento}>
        Cambiar evento
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, color: '#6c757d' },
  value: { fontSize: 18, marginBottom: 40 },
  button: { marginTop: 20 },
});
