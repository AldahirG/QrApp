import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
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
  const [edad, setEdad] = useState('');
  const [escuelaProcedencia, setEscuelaProcedencia] = useState('');
  const [programa, setPrograma] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!nombre || !telefono) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Nombre y teléfono son obligatorios.',
      });
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/registros/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          telefono,
          correo,
          edad,
          escuelaProcedencia,
          programa,
          asistio: true,
          fechaRegistro: moment().toISOString(),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Registro creado exitosamente',
        });

        setNombre('');
        setTelefono('');
        setCorreo('');
        setEdad('');
        setEscuelaProcedencia('');
        setPrograma('');

        setTimeout(() => {
          navigation.navigate('Home');
        }, 2000);
      } else {
        alert('Error al crear el registro');
      }
    } catch (error) {
      alert('Error en la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
    source={require('../assets/banner.jpg')}  // Background image
    style={styles.background}
  >
    <ScrollView contentContainerStyle={styles.container}>
   
      <Image source={require('../assets/HF-LOGO-2024.png')} style={styles.logo} />
      <Text style={styles.header}>Nuevo Registro</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ingresa el nombre"
          placeholderTextColor="#ddd"
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
          maxLength={10}
          placeholderTextColor="#ddd"
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
          placeholderTextColor="#ddd"
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
          maxLength={2}
          placeholderTextColor="#ddd"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Escuela de Procedencia</Text>
        <TextInput
          style={styles.input}
          value={escuelaProcedencia}
          onChangeText={setEscuelaProcedencia}
          placeholder="Ingresa la escuela de procedencia"
          placeholderTextColor="#ddd"
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Grado</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, 
  },
  container: {
    flexGrow: 1, 
    padding: 20,
  },
  logo: {
    width: 250,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9a602',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#f9a602',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#8a2466',
    color: '#fff',
  },
  pickerContainer: {
    borderColor: '#f9a602',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#8a2466',
    justifyContent: 'center',
    height: 40,
  },
  picker: {
    color: '#fff', // Color blanco para el texto seleccionado
    backgroundColor: '#8a2466', // Fondo morado
  },
  button: {
    marginTop: 20,
    backgroundColor: '#8a2466',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});


export default Register;
