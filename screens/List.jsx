import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config'; // Importa correctamente BASE_URL

const List = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [showResults, setShowResults] = useState(false); // Para controlar si se muestran los resultados
  const navigation = useNavigation();

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/registros`, {
        // headers: {
        //   'Authorization': `Bearer ${token}`
        // }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Solo ejecutar la búsqueda cuando se presiona el botón
  const handleSearch = () => {
    fetchUsers(); // Ejecutar la búsqueda
    setShowResults(true); // Mostrar los resultados después de la búsqueda
  };

  // Filtrar los usuarios según la búsqueda
  const filteredUsers = users
    .filter(user =>
      user.nombre.toLowerCase().includes(search.toLowerCase()) || 
      user.correo.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 10); // Limitar a los primeros 10 usuarios

  return (
    <ImageBackground
      source={require('../assets/banner.jpg')}  // Fondo de la imagen
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar usuarios"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#ddd"
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>

        {/* Mostrar los resultados solo si se ha presionado buscar */}
        {showResults && (
          filteredUsers.length > 0 ? (
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Nombre</Text>
                <Text style={styles.tableHeaderText}>Telefono</Text>
                <Text style={styles.tableHeaderText}>Acciones</Text>
              </View>
              {filteredUsers.map(user => (
                <View key={user.idhalloweenfest_registro} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{user.nombre}</Text>
                  <Text style={styles.tableCell}>{user.telefono}</Text>
                  <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('ShowInfo', { data: user })}
                  >
                    <Text style={styles.buttonText}>Ver</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noResultsText}>No se encontraron usuarios</Text>
          )
        )}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F2446',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    borderColor: '#f9a602', // Naranja para el borde del input
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
    color: '#fff', // Color del texto del input
  },
  searchButton: {
    backgroundColor: '#8a2466',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2F2446',
    padding: 10,
    borderRadius: 10,
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    width: '33%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#8a2466',
    borderRadius: 10,
    marginTop: 5,
  },
  tableCell: {
    color: '#fff',
    width: '33%',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#f9a602',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noResultsText: {
    textAlign: 'center',
    color: '#fff', // Texto en blanco para resultados vacíos
    marginTop: 20,
  },
});

export default List;
