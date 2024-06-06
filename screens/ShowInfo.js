import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ShowInfo = ({ route }) => {
  const { data } = route.params;
  const { nombre, correo, telefono, nivel_estudios, conferencista, nombre_invito, fecha_registro, asistio } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Información de Registro</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.text}>{nombre}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.text}>{correo}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.text}>{telefono}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nivel de Estudios:</Text>
          <Text style={styles.text}>{nivel_estudios}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Conferencista:</Text>
          <Text style={styles.text}>{conferencista}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nombre de quien invitó:</Text>
          <Text style={styles.text}>{nombre_invito}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Fecha de Registro:</Text>
          <Text style={styles.text}>{fecha_registro}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>¿Asistió?:</Text>
          <Text style={styles.text}>{asistio}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Confirmar Asistencia</Text>
      </View>
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
