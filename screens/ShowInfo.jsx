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
  const [programa, setPrograma] = useState(data.programa || '');
  const [disfraz, setDisfraz] = useState(data.disfraz || '');
  const [nombreInvito, setNombreInvito] = useState(data.invito || '');
  const [fechaRegistro, setFechaRegistro] = useState(
    data.fechaRegistro ? moment(data.fechaRegistro).format('DD/MM/YYYY') : ''
  );
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
          programa,
          disfraz,
          invito: nombreInvito,
          fechaRegistro: moment(fechaRegistro, 'DD/MM/YYYY').toISOString(),
          asistio: asistio === 'SI' ? 1 : 0,
        }),
      });

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Actualización exitosa',
          text2: 'La asistencia fue confirmada correctamente.',
        });
        setTimeout(() => {
          navigation.navigate('Home');
        }, 2000);
      } else {
        throw new Error('Error al actualizar el registro.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../assets/banner.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Información de Registro</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput style={styles.input} value={nombre} editable={false} />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput style={styles.input} value={telefono} editable={telefono === ''} onChangeText={setTelefono} />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Correo</Text>
          <TextInput style={styles.input} value={correo} editable={correo === ''} onChangeText={setCorreo} />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Programa</Text>
          <TextInput style={styles.input} value={programa} editable={false} />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>¿Quién te invitó?</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={nombreInvito} onValueChange={setNombreInvito} style={styles.input}>
              <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
              <Picker.Item label="NINGUNO DE LOS ANTERIORES" value="NINGUNO" />
              <Picker.Item label="ALUMNO" value="ALUMNO"/>
              <Picker.Item label="ADRIAN MOLINA" value="ADRIAN MOLINA" />
              <Picker.Item label="ALDAHIR GOMEZ" value="ALDAHIR GOMEZ" />
              <Picker.Item label="ANALIT ROMÁN ARCE" value="ANALIT ROMÁN ARCE" />
              <Picker.Item label="ANALY ORTEGA" value="ANALY ORTEGA" />
              <Picker.Item label="ALEJANDRA RIVAS" value="ALEJANDRA RIVAS" />
              <Picker.Item label="ANGÉLICA NIETO" value="ANGÉLICA NIETO" />
              <Picker.Item label="BRYAN MURGA" value="BRYAN MURGA" />
              <Picker.Item label="CÉSAR SANTA OLALLA" value="CÉSAR SANTA OLALLA" />
              <Picker.Item label="EMMANUEL MONTES DE OCA" value="EMMANUEL MONTES DE OCA" />
              <Picker.Item label="JESÚS GUZMÁN" value="JESÚS GUZMÁN" />
              <Picker.Item label="JESUS TRILLO" value="JESUS TRILLO" />
              <Picker.Item label="KEREN GOMEZ" value="KEREN GOMEZ" />
              <Picker.Item label="MELYSSA MONRROY" value="MELYSSA MONRROY" />
              <Picker.Item label="MARCO SALGADO" value="MARCO SALGADO" />
              <Picker.Item label="NORMAN HERNANDEZ" value="NORMAN HERNANDEZ" />
              <Picker.Item label="RAUL CASTILLEJA" value="RAUL CASTILLEJA" />
              <Picker.Item label="XIMENA MARTÍNEZ" value="XIMENA MARTÍNEZ" />
              <Picker.Item label="YANIN VAZQUEZ" value="YANIN VAZQUEZ" />
            </Picker>
          </View>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa', // Fondo claro para toda la vista
  },
  container: {
    flexGrow: 1,
    padding: 20,
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40', // Texto oscuro para mayor legibilidad
    textAlign: 'center',
    marginBottom: 20,
  },
  infoBox: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40', // Texto oscuro para etiquetas
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#dee2e6', // Gris claro para bordes
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff', // Fondo blanco para inputs
    color: '#495057', // Texto gris oscuro para mayor contraste
    fontSize: 14,
  },
  pickerContainer: {
    borderColor: '#dee2e6', // Gris claro para bordes
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#ffffff', // Fondo blanco para selects
    justifyContent: 'center',
    height: 40,
  },
  picker: {
    color: '#495057', // Texto gris oscuro para selects
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff', // Azul moderno para botones
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: '#dc3545', // Rojo para botón de cancelar
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // Blanco para texto de botones
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShowInfo;
