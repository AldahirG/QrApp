import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Universidad Internacional Uninter</Text>
      <Text style={styles.header}>Generar Registro</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
        />
        <Icon name="search" size={25} color="gray" style={styles.searchIcon} />
      </View>
      <View style={styles.categories}>
        <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/')}>
          <Icon name="home" size={40} color="white" />
          <Text style={styles.categoryText}>Landing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/sesiones-informativas/')}>
          <Icon name="info" size={40} color="white" />
          <Text style={styles.categoryText}>Sesiones Informativas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/conferencias/')}>
          <Icon name="forum" size={40} color="white" />
          <Text style={styles.categoryText}>Conferencias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.category} onPress={() => Linking.openURL('https://uninter.edu.mx/talleres/')}>
          <Icon name="kayaking" size={40} color="white" />
          <Text style={styles.categoryText}>Talleres</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subheader}>Acciones</Text>
      <View style={styles.courses}>
        <TouchableOpacity style={styles.course} onPress={() => navigation.navigate('Scanner')}>
          <Icon name="qr-code-scanner" size={80} color="gray" />
          <Text style={styles.courseTitle}>Escanear QR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.course} onPress={() => navigation.navigate('List')}>
          <Icon name="content-paste-search" size={80} color="gray" />
          <Text style={styles.courseTitle}>Buscar por Nombre</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 20,
    marginTop: 40,
    color: '#555',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  category: {
    alignItems: 'center',
    backgroundColor: '#025FF5',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  categoryText: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  courses: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  course: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  courseTitle: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
