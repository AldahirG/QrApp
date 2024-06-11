import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const ShowInfo = ({ route }) => {
  const { data } = route.params;
  const [loading, setLoading] = useState(false);

  const confirmAttendance = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://10.3.0.28:5000/api/users/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ asistio: true })
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Asistencia confirmada');
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Información de Registro</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.text}>{data.nombre}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.text}>{data.correo}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.text}>{data.telefono}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nivel de Estudios:</Text>
          <Text style={styles.text}>{data.nivel_estudios}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Conferencista:</Text>
          <Text style={styles.text}>{data.conferencista}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nombre de quien invitó:</Text>
          <Text style={styles.text}>{data.nombre_invito}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Fecha de Registro:</Text>
          <Text style={styles.text}>{data.fecha_registro}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>¿Asistió?:</Text>
          <Text style={styles.text}>{data.asistio ? 'Sí' : 'No'}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.buttonContainer} onPress={confirmAttendance} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Confirmando...' : 'Confirmar Asistencia'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#025FF5',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    alignSelf: 'center',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  infoBox: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#025FF5',
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    backgroundColor: '#800080',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default ShowInfo;
