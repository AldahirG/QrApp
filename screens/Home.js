import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={30} color="#333" />
        </TouchableOpacity>
        <Text style={styles.greeting}>U N I N T E R</Text>
        <TouchableOpacity>
          <Icon name="account-circle" size={30} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
      <TouchableOpacity style={styles.course} onPress={() => navigation.navigate('Assistences')}>
          <Icon name="content-paste" size={80} color="gray" />
          <Text style={styles.courseTitle}>Listar Asistentes</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Registrar en:</Text>
      <View style={styles.categories}>
        <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/')}>
          <Icon name="home" size={40} color="#333" />
          <Text style={styles.categoryText}>Landing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/sesiones-informativas/')}>
          <Icon name="info" size={40} color="#333" />
          <Text style={styles.categoryText}>Sesiones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/conferencias/')}>
          <Icon name="forum" size={40} color="#333" />
          <Text style={styles.categoryText}>Conferencias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/talleres/')}>
          <Icon name="kayaking" size={40} color="#333" />
          <Text style={styles.categoryText}>Talleres</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.sectionTitle}>Confirmar Asistencia</Text>
      <View style={styles.courses}>
        <TouchableOpacity style={styles.course} onPress={() => navigation.navigate('Scanner')}>
          <Icon name="qr-code-scanner" size={80} color="gray" />
          <Text style={styles.courseTitle}>Escanear QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.course} onPress={() => navigation.navigate('List')}>
          <Icon name="content-paste-search" size={80} color="gray" />
          <Text style={styles.courseTitle}>Buscar por Nombre</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
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
    color: '#333',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardDate: {
    fontSize: 16,
    color: '#888',
  },
  cardTitle: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardValue: {
    fontSize: 36,
    color: '#025FF5',
    fontWeight: 'bold',
  },
  cardValueSmall: {
    fontSize: 16,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  category: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '45%',
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  deviceCount: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  courses: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  course: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '45%',
    marginBottom: 10,
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
});


