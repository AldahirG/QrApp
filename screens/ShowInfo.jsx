import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../config'; 

const ShowInfo = ({ route }) => {
  const { data } = route.params; 
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState(data.nombre || ''); 
  const [correo, setCorreo] = useState(data.correo || '');
  const [telefono, setTelefono] = useState(data.telefono || '');
  const [escuelaProcedencia, setEscuelaProcedencia] = useState(data.escuelaProcedencia || '');
  const [artista, setArtista] = useState(data.artista || '');
  const [disfraz, setDisfraz] = useState(data.disfraz || '');
  const [nombreInvito, setNombreInvito] = useState(data.invito || '');
  const [fechaRegistro, setFechaRegistro] = useState(moment(data.fechaRegistro).format('DD/MM/YYYY') || '');
  const [asistio, setAsistio] = useState(data.asistio ? 'SI' : 'NO');
  const navigation = useNavigation();

  const confirmAttendance = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/registros/update/${data.idhalloweenfest_registro}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
          escuelaProcedencia,
          artista,
          disfraz,
          invito: nombreInvito,
          fechaRegistro: moment(fechaRegistro, 'DD/MM/YYYY').toISOString(), 
          asistio: asistio === 'SI' ? 1 : 0 
        })
      });

      const result = await response.json();

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Asistencia confirmada',
        });
        setTimeout(() => {
          navigation.navigate('Home');
        }, 2000);
      } else {
        Alert.alert('Error', result.message || 'Error en la actualización');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/banner.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Información de Registro</Text>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Correo</Text>
          <TextInput style={styles.input} value={correo} onChangeText={setCorreo} />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Escuela de Procedencia</Text>
          <TextInput style={styles.input} value={escuelaProcedencia} onChangeText={setEscuelaProcedencia} />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Artista</Text>
          <TextInput style={styles.input} value={artista} onChangeText={setArtista} />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Disfraz</Text>
          <TextInput style={styles.input} value={disfraz} onChangeText={setDisfraz} />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nombre de quien invitó</Text>
          <TextInput style={styles.input} value={nombreInvito} onChangeText={setNombreInvito} />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Fecha de Registro</Text>
          <TextInput style={styles.input} value={fechaRegistro} editable={false} />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>¿Asistió?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={asistio}
              onValueChange={(itemValue) => setAsistio(itemValue)}
              style={styles.picker}
            >
      <Picker.Item label="SI" value="SI" style={{ color: '#8a2466' }} />  {/* Color blanco para opciones */}
      <Picker.Item label="NO" value="NO" style={{ color: '#8a2466' }} />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={confirmAttendance} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Confirmando...' : 'Confirmar Asistencia'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    padding: 20,
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
    borderColor: '#f9a602', // Borde naranja
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#8a2466', // Fondo morado del contenedor
    justifyContent: 'center',
    height: 40,
  },
  picker: {
    color: '#fff', // Color blanco para el texto seleccionado
    backgroundColor: '#8a2466', // Quitar fondo adicional
  },
  button: {
    marginTop: 20,
    backgroundColor: '#8a2466',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ShowInfo;
