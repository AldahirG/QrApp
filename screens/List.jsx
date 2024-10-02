import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
      const response = await fetch(`${BASE_URL}/api/registros`, { // Utiliza BASE_URL aquí
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
      <Ionicons name="person-circle-outline" size={40} color="#025FF5" />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.nombre}</Text>
        <Text style={styles.itemEmail}>{item.correo}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuarios"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={item => item.idhalloweenfest_registro.toString()}
        ListEmptyComponent={<Text style={styles.noResultsText}>No se encontraron usuarios</Text>}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    borderColor: '#025FF5',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemEmail: {
    color: '#666',
  },
  noResultsText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

export default List;
