import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config'; // Importa correctamente BASE_URL

const List = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  const fetchUsers = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/registros`); // Utiliza BASE_URL aquí
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Al enfocar la vista, ejecuta la consulta
      fetchUsers();
    }, [])
  );

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(search.toLowerCase()) || 
    user.correo.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ShowInfo', { data: item })}>
      <Ionicons name="person-circle-outline" size={40} color="#f9a602" /> {/* Naranja para el icono */}
      <View style={styles.itemTextContainer}>
         <Text style={styles.itemName}>{item.nombre}</Text>
        <Text style={styles.itemEmail}>{item.correo}</Text>
      </View>
    </TouchableOpacity>
  );

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
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={item => item.idhalloweenfest_registro.toString()}
          ListEmptyComponent={<Text style={styles.noResultsText}>No se encontraron usuarios</Text>}
        />
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8a2466',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#f9a602', // Naranja para el borde del item
    borderWidth: 1,
  },
  itemTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Blanco para el nombre
  },
  itemEmail: {
    color: '#ddd', // Gris claro para el correo
  },
  noResultsText: {
    textAlign: 'center',
    color: '#fff', // Texto en blanco para resultados vacíos
    marginTop: 20,
  },
});

export default List;
