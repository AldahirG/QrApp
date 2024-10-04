import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking, Alert, Modal, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../config';  // Asegúrate de tener configurado el BASE_URL

export default function Home() {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
      } else {
        Alert.alert('Sesión expirada', 'Por favor, inicia sesión nuevamente');
        navigation.navigate('Login'); 
      }
    };
    checkToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
    setModalVisible(false);
    navigation.navigate('Login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../assets/banner.jpg')}  // Background image
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.greeting}>U N I N T E R</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="account-circle" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.card}>
          <TouchableOpacity style={styles.course} onPress={() => navigation.navigate('Assistences')}>
            <Icon name="content-paste" size={80} color="#f9a602" /> {/* Updated to Halloween orange-yellow */}
            <Text style={styles.courseTitle}>Listar Asistentes</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Registrar en:</Text>
        <View style={styles.categories}>
          <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/')}>
            <Icon name="home" size={40} color="#f9a602" />  {/* Updated icon color */}
            <Text style={styles.categoryText}>Landing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/sesiones-informativas/')}>
            <Icon name="info" size={40} color="#f9a602" />  {/* Updated icon color */}
            <Text style={styles.categoryText}>Sesiones</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/conferencias/')}>
            <Icon name="forum" size={40} color="#f9a602" />  {/* Updated icon color */}
            <Text style={styles.categoryText}>Conferencias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/talleres/')}>
            <Icon name="kayaking" size={40} color="#f9a602" />  {/* Updated icon color */}
            <Text style={styles.categoryText}>Talleres</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    color: '#fff', // Text color in line with the theme
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#890c58', // Primary color from the palette
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Secondary color for section titles
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  category: {
    backgroundColor: '#890c58', // Primary color for the categories
    borderRadius: 20,
    padding: 20,
    width: '45%',
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: '#fff', // Text color
    marginTop: 10,
  },
  course: {
    backgroundColor: '#890c58', // Main color from the palette
    borderRadius: 20,
    padding: 20,
    width: '45%',
    marginBottom: 10,
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 16,
    color: '#fff', // Text color in line with the theme
    marginTop: 10,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
