import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

import { BASE_URL } from '../config';
import { setEventoSeleccionado } from '../utils/storage';

import Loader from '../components/Loader';
import CustomButton from '../components/CustomButton';
import EmptyState from '../components/EmptyState';

export default function Home({ navigation }) {
  const [mes] = useState(moment().format('YYYY-MM'));
  const [eventos, setEventos] = useState([]);
  const [conferencista, setConferencista] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/api/registros/eventos/por-mes?mes=${mes}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setEventos(data);
          setConferencista(data[0].Conferencista);
        } else {
          setEventos([]);
        }
      })
      .catch(() => {
        Alert.alert('Error', 'No se pudo cargar la lista de eventos');
      })
      .finally(() => setLoading(false));
  }, []);

  const continuar = async () => {
    if (!conferencista) {
      Alert.alert('Debes seleccionar un evento');
      return;
    }

    await setEventoSeleccionado(conferencista);
    navigation.replace('Main');
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona el evento activo</Text>

      {eventos.length === 0 ? (
        <EmptyState message="No hay eventos disponibles para este mes." />
      ) : (
        <Picker
          selectedValue={conferencista}
          onValueChange={setConferencista}
          style={styles.picker}
        >
          {eventos.map((evento, index) => (
            <Picker.Item
              key={index}
              label={evento.Conferencista}
              value={evento.Conferencista}
            />
          ))}
        </Picker>
      )}

      <CustomButton label="Continuar" onPress={continuar} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  picker: { backgroundColor: '#fff', borderRadius: 6, marginBottom: 30 },
  button: { marginTop: 10 },
});
