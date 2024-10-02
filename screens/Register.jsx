import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../config';
import moment from 'moment';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [edad, setEdad] = useState(''); // Estado para el campo edad
  const [escuelaProcedencia, setEscuelaProcedencia] = useState('');
  const [programa, setPrograma] = useState(''); // Estado para el programa seleccionado
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/registros/create`, { // Usa la ruta correcta para crear registros
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre,
          telefono,
          correo,
          edad, // Enviar el campo de edad
          escuelaProcedencia,
          programa,
          asistio: true, // Asumimos que asistió es true por defecto
          fechaRegistro: moment().toISOString(), // Registrar la fecha actual
        })
      });

      const result = await response.json();
      if (response.ok) {
        // Mostrar mensaje de éxito
        Toast.show({
          type: 'success',
          text1: 'Registro creado exitosamente',
        });

        // Limpiar formulario
        setNombre('');
        setTelefono('');
        setCorreo('');
        setEdad(''); // Limpiar el campo de edad
        setEscuelaProcedencia('');
        setPrograma('');

        // Navegar de regreso al home
        setTimeout(() => {
          navigation.navigate('Home');
        }, 2000);
      } else {
        console.error('Error del servidor:', result);
        alert('Error al crear el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Nuevo Registro</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ingresa el nombre"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Ingresa el teléfono"
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          placeholder="Ingresa el correo"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          value={edad}
          onChangeText={setEdad}
          placeholder="Ingresa la edad"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Escuela de Procedencia</Text>
        <TextInput
          style={styles.input}
          value={escuelaProcedencia}
          onChangeText={setEscuelaProcedencia}
          placeholder="Ingresa la escuela de procedencia"
        />
      </View>

      {/* Campo de Programa de Interés con Picker */}
      <View style={styles.infoBox}>
        <Text style={styles.label}>Programa</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={programa}
            onValueChange={(itemValue) => setPrograma(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
            <Picker.Item label="SECUNDARIA" value="SECUNDARIA" />
            <Picker.Item label="BACHILLERATO" value="BACHILLERATO" />
            <Picker.Item label="UNIVERSIDAD" value="UNIVERSIDAD" />
            <Picker.Item label="POSGRADO" value="POSGRADO" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Registrando...' : 'Registrar'}</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#333',
  },
  pickerContainer: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#025FF5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Register;
