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
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [nivelEstudios, setNivelEstudios] = useState('');
  const [nombreInvito, setNombreInvito] = useState('');
  const [alumno, setAlumno] = useState('');
  const [tipo] = useState('SESIÓN INFORMATIVA');
  const [escProc, setEscProc] = useState('');
  const [nivelUninter, setNivelUninter] = useState('');
  const [programaInteres, setProgramaInteres] = useState('');
  const [asistio, setAsistio] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const conferencista = 'ONE DAY UNINTER NOVIEMBRE 2024';

  const getProgramOptions = () => {
    switch (nivelEstudios) {
      case 'SECUNDARIA':
        return ['SIU MULTICULTURAL', 'SIU BILINGÜE'];
      case 'BACHILLERATO':
        return ['BIU MULTICULTURAL', 'BIU BILINGÜE'];
      case 'UNIVERSIDAD':
        return [
          'Psicología (LPS)',
          'Derecho (LED)',
          'Pedagogía (LPE)',
          'Ciencias Políticas y Gestión Pública (LCP)',
          'Relaciones Internacionales (LRI)',
          'Relaciones Internacionales y Economía (RIEC)',
          'Relaciones Internacionales y Ciencias Políticas (RICP)',
          'Idiomas (LID)',
          'Comunicación (LCO)',
          'Comunicación y Relaciones Públicas (CORP)',
          'Comercio Exterior (LCE)',
          'Economía y Finanzas (LEF)',
          'Mercadotecnia (LEM)',
          'Mercadotecnia y Publicidad (LEMP)',
          'Psicología Organizacional (LPO)',
          'Administración de Empresas Turísticas (LAET)',
          'Administración de Empresas (LAE)',
          'Administración de Negocios Internacionales (LANI)',
          'Administración Pública (LAP)',
          'Administración y Mercadotecnia (LAM)',
          'Diseño de Modas y Tendencias Internacionales (LDM)',
          'Diseño Industrial (LDI)',
          'Diseño Gráfico (LDG)',
          'Animación y Diseño Digital (LADD)',
          'Arquitectura (ARQ)',
          'Civil (ICI)',
          'Mecatrónica (IME)',
          'Mecánica Industrial (IMI)',
          'Industrial y de Sistemas de Calidad (IISCA)',
          'Sistemas Computacionales (ISC)',
          'Ambiental (IAM)',
          'Gestión Empresarial (LEGE)',
          'Mercadotecnia (LEMK)',
          'Administración de Negocios Internacionales (LEANI)',
          'Mercadotecnia y Publicidad (LEMKP)',
          'Comercio Exterior (LECE)',
      ];      
      case 'POSGRADO':
        return [
          'Maestría en Administración y Dirección de Empresas (MADE)',
          'Especialidad en Marketing Digital (EMD)',
          'Doctorado en Administración',
          'Especialidad en Criminalística (EC)',
          'Especialidad en Relaciones Mercantiles Internacionales (ERMI)',
          'Especialidad en Promoción Turística (EPT)',
          'Especialidad en Publicidad (EPU)',
          'Especialidad en Administración de la Tecnología en Línea (EATL)',
          'Especialidad en Administración de Obra (EAO)',
          'Especialidad en Animación y Post-Producción Digital (EAPD)',
          'Maestría en Línea de Administración y Dirección de Empresas (MADEL)',
          'Maestría en Administración con Especialidad en Negocios Internacionales (MAD)',
          'Maestría en Alta Dirección (MADIR)',
          'Maestría en Finanzas Corporativas (MFC)',
          'Maestría en Gestión de la Calidad (MGC)',
          'Maestría en Gestión del Factor y Capital Humano (MGFH)',
          'Maestría en Impuestos (MI)',
          'Maestría en Mercadotecnia Global (MMG)',
          'Maestría en Educación en Formación Docente (MEFD)',
          'Maestría en Enseñanza de Lenguas Extranjeras (MEL)',
          'Maestría en Redes de Computadoras y Tecnologías WEB (MARET)',
          'Doctorado en Humanidades',
      ];      
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    if (!nombre || !correo || !telefono || !nivelEstudios || !nombreInvito || !alumno || !asistio) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor, completa todos los campos obligatorios.',
      });
      return;
    }
  
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const payload = {
        nombre: nombre.trim(), // Asegura que no haya espacios en blanco
        correo: correo.trim().toLowerCase(), // Normaliza el correo
        telefono: telefono.trim(),
        Nivel_Estudios: nivelEstudios,
        Conferencista: conferencista,
        Nombre_invito: nombreInvito,
        fecha_registro: moment().toISOString(),
        alumno,
        tipo,
        escProc,
        NivelUninter: nivelUninter,
        programaInteres,
        asistio,
      };
  
      console.log('Payload enviado:', payload); // Para depurar el payload
  
      const response = await fetch(`${BASE_URL}/api/registros/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Registro creado exitosamente',
        });
  
        // Limpiar formulario
        setNombre('');
        setCorreo('');
        setTelefono('');
        setNivelEstudios('');
        setNombreInvito('');
        setAlumno('');
        setEscProc('');
        setNivelUninter('');
        setProgramaInteres('');
        setAsistio('');
  
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
    <ImageBackground source={require('../assets/banner.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/uninterlogo.png')} style={styles.logo} />
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
          <Text style={styles.label}>Nivel de Estudios</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={nivelEstudios}
              onValueChange={(itemValue) => {
                setNivelEstudios(itemValue);
                setProgramaInteres('');
              }}
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

        {nivelEstudios && (
          <View style={styles.infoBox}>
            <Text style={styles.label}>Programa de Interés</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={programaInteres}
                onValueChange={setProgramaInteres}
                style={styles.input}
              >
                <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
                {getProgramOptions().map((option) => (
                  <Picker.Item key={option} label={option} value={option} />
                ))}
              </Picker>
            </View>
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.label}>Escuela de Procedencia</Text>
          <TextInput
            style={styles.input}
            value={escProc}
            onChangeText={setEscProc}
            placeholder="Ingresa la escuela de procedencia"
            placeholderTextColor="#ddd"
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>¿Eres alumno Uninter?</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={alumno} onValueChange={setAlumno} style={styles.input}>
              <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
              <Picker.Item label="SI" value="SI" />
              <Picker.Item label="NO" value="NO" />
            </Picker>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>¿Asistirás al evento?</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={asistio} onValueChange={setAsistio} style={styles.input}>
              <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
              <Picker.Item label="SI" value="SI" />
              <Picker.Item label="NO" value="NO" />
            </Picker>
          </View>
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
    justifyContent: 'center',
    backgroundColor: '#f8f9fa', // Fondo claro para toda la vista
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40', // Texto oscuro para encabezado
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    marginBottom: 15,
    backgroundColor: '#ffffff', // Fondo blanco para el contenedor de cada campo
    borderRadius: 10,
    padding: 10,
    borderColor: '#dee2e6', // Borde gris claro para separación visual
    borderWidth: 1,
    elevation: 1, // Sombra ligera para darle profundidad
  },
  label: {
    fontSize: 16,
    color: '#495057', // Texto gris oscuro para etiquetas
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    height: 40,
    borderColor: '#dee2e6', // Gris claro para bordes de input
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff', // Fondo blanco para inputs
    color: '#343a40', // Texto oscuro para inputs
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 0, // Eliminamos el borde externo
    borderRadius: 8, // Redondeamos las esquinas
    backgroundColor: '#ffffff', // Fondo blanco
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // Sombra ligera para darle profundidad
  },
  
  
  button: {
    marginTop: 20,
    backgroundColor: '#007bff', // Azul moderno para botones
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000', // Sombra para darle profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff', // Texto blanco para botones
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default Register;