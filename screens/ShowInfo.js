import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ShowInfo = ({ data }) => {
  const { nombre, correo, telefono, nivel_estudios, conferencista, nombre_invito, fecha_registro, asistio } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nombre: {nombre}</Text>
      <Text style={styles.text}>Correo: {correo}</Text>
      <Text style={styles.text}>Telefono: {telefono}</Text>
      <Text style={styles.text}>Nivel Estudios: {nivel_estudios}</Text>
      <Text style={styles.text}>Conferencista: {conferencista}</Text>
      <Text style={styles.text}>Nombre Invitado: {nombre_invito}</Text>
      <Text style={styles.text}>Fecha Registro: {fecha_registro}</Text>
      <Text style={styles.text}>Asistio: {asistio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});

export default ShowInfo;
