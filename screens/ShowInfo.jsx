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
  const [programa, setPrograma] = useState(data.programa || '');  // Grado en lugar de Programa
  const [disfraz, setDisfraz] = useState(data.disfraz || '');  // Participar en el concurso de disfraces
  const [nombreInvito, setNombreInvito] = useState(data.invito || '');
  const [fechaRegistro, setFechaRegistro] = useState(data.fechaRegistro ? moment(data.fechaRegistro).format('DD/MM/YYYY') : '');
  const [asistio, setAsistio] = useState(data.asistio ? 'SI' : 'NO');
  const [comoEnteroEvento, setComoEnteroEvento] = useState(data.comoEnteroEvento || '');
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
          programa,  // Grado
          disfraz,  // Participar en el concurso de disfraces
          invito: nombreInvito,  // Quien te invitó
          fechaRegistro: moment(fechaRegistro, 'DD/MM/YYYY').toISOString(),  // Fecha de registro
          asistio: asistio === 'SI' ? 1 : 0,
          comoEnteroEvento,  // Cómo se enteró
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

        {/* Campo Nombre */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} value={nombre} editable={false} />
        </View>

        {/* Campo Teléfono */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput style={styles.input} value={telefono} editable={telefono === ''} onChangeText={setTelefono} />
        </View>

        {/* Campo Correo */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Correo</Text>
          <TextInput style={styles.input} value={correo} editable={correo === ''} onChangeText={setCorreo} />
        </View>

        {/* Campo Programa (Grado) */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Programa</Text>
          {programa ? (
            <TextInput style={styles.input} value={programa} editable={false} />
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={programa}
                onValueChange={(itemValue) => setPrograma(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
                <Picker.Item label="SECUNDARIA" value="SECUNDARIA" />
                <Picker.Item label="BACHILLERATO" value="BACHILLERATO" />
                <Picker.Item label="UNIVERSIDAD" value="UNIVERSIDAD" />
                <Picker.Item label="POSGRADO" value="POSGRADO" />
              </Picker>
            </View>
          )}
        </View>

        {/* Campo Disfraz (Participar en el concurso de disfraces) */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>¿Participarás en el concurso de disfraces?</Text>
          {disfraz ? (
            <TextInput style={styles.input} value={disfraz} editable={false} />
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={disfraz}
                onValueChange={(itemValue) => setDisfraz(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
                <Picker.Item label="SI" value="SI" />
                <Picker.Item label="NO" value="NO" />
              </Picker>
            </View>
          )}
        </View>

        {/* Campo Nombre de quien invitó */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>¿Quién te invitó?</Text>
          {nombreInvito ? (
            <TextInput style={styles.input} value={nombreInvito} editable={false} />
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={nombreInvito}
                onValueChange={(itemValue) => setNombreInvito(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
                <Picker.Item label="SECUNDARIA" value="SECUNDARIA" />
                <Picker.Item label="BACHILLERATO" value="BACHILLERATO" />
                <Picker.Item label="UNIVERSIDAD" value="UNIVERSIDAD" />
                <Picker.Item label="POSGRADO" value="POSGRADO" />
              </Picker>
            </View>
          )}
        </View>

        {/* Campo Fecha de Registro */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Fecha de Registro</Text>
          <TextInput style={styles.input} value={fechaRegistro} editable={false} />
        </View>

        {/* Campo ¿Asistió? */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>¿Asistió?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={asistio}
              onValueChange={(itemValue) => setAsistio(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="SI" value="SI" />
              <Picker.Item label="NO" value="NO" />
            </Picker>
          </View>
        </View>

        {/* Campo ¿Cómo te enteraste del evento? */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>¿Cómo te enteraste del evento?</Text>
          {comoEnteroEvento ? (
            <TextInput style={styles.input} value={comoEnteroEvento} editable={false} />
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={comoEnteroEvento}
                onValueChange={(itemValue) => setComoEnteroEvento(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
                <Picker.Item label="REDES SOCIALES" value="Redes sociales" />
                <Picker.Item label="PÁGINA WEB" value="Página web" />
                <Picker.Item label="VISITA ESCUELA" value="Visita escuela" />
                <Picker.Item label="PUBLICIDAD EN CALLE" value="Publicidad en calle" />
                <Picker.Item label="ME ENVIARON MENSAJE" value="Me enviaron mensaje" />
                <Picker.Item label="YA LO CONOCÍA" value="Ya lo conocía" />
                <Picker.Item label="POR INVITACIÓN AMIGO" value="Por invitación amigo" />
                <Picker.Item label="CORREO" value="Correo" />
                <Picker.Item label="RADIO" value="Radio" />
              </Picker>
            </View>
          )}
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
    borderColor: '#f9a602',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#8a2466',
    justifyContent: 'center',
    height: 40,
  },
  picker: {
    color: '#fff',
    backgroundColor: '#8a2466',
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
