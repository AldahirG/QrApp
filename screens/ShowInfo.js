import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const ShowInfo = ({ route }) => {
  const { data } = route.params;
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState(data.Nombre);
  const [correo, setCorreo] = useState(data.Correo);
  const [telefono, setTelefono] = useState(data.Telefono);
  const [nivelEstudios, setNivelEstudios] = useState(data.Nivel_Estudios);
  const [conferencista, setConferencista] = useState(data.Conferencista);
  const [nombreInvito, setNombreInvito] = useState(data.Nombre_invito);
  const [fechaRegistro, setFechaRegistro] = useState(moment(data.fecha_registro).format('DD/MM/YYYY'));
  const [asistio, setAsistio] = useState(data.asistio);
  const navigation = useNavigation();

  const confirmAttendance = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/registros/${data.idregistro_conferencias}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          Nombre: nombre,
          Correo: correo,
          Telefono: telefono,
          Nivel_Estudios: nivelEstudios,
          Conferencista: conferencista,
          Nombre_invito: nombreInvito,
          fecha_registro: moment(fechaRegistro, 'DD/MM/YYYY').toISOString(),
          asistio: asistio
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
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <Text style={styles.label}>Nivel de Estudios</Text>
        <TextInput style={styles.input} value={nivelEstudios} onChangeText={setNivelEstudios} />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Conferencista</Text>
        <TextInput style={styles.input} value={conferencista} onChangeText={setConferencista} />
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
            style={styles.input}
          >
            <Picker.Item label="SI" value="SI" />
            <Picker.Item label="NO" value="NO" />
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
