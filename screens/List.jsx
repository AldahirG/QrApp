import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL, CONFERENCISTA_BASE } from '../config';

const List = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigation = useNavigation();

  const normalizeText = (text) => {
    return text
      ? text
          .normalize('NFD') // Normaliza caracteres Unicode
          .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
          .toLowerCase()
      : ''; // Si `text` es null o undefined, retorna una cadena vacía
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/registros/getAll/${encodeURIComponent(CONFERENCISTA_BASE)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Usuarios devueltos:', data); // Verifica qué propiedades existen
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = () => {
    fetchUsers();
    setShowResults(true);
  };

  const filteredUsers = users.filter((user) =>
    normalizeText(user?.nombre).includes(normalizeText(search))
  );

  return (
    <ImageBackground
      source={require('../assets/banner.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Registros</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar usuarios"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#F0F0F0"
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>

        {showResults && (
          filteredUsers.length > 0 ? (
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Nombre</Text>
                <Text style={styles.tableHeaderText}>Teléfono</Text>
                <Text style={styles.tableHeaderText}>Acciones</Text>
              </View>
              {filteredUsers.map((user) => (
                <View key={user.idregistro_conferencias} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{user?.nombre || 'Sin nombre'}</Text>
                  <Text style={styles.tableCell}>{user?.telefono || 'Sin teléfono'}</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Fondo blanco limpio para el contenedor de búsqueda
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    borderColor: '#dee2e6', // Gris claro para el borde
    borderWidth: 1,
    elevation: 1, // Sombra ligera para el campo de búsqueda
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
    color: '#343a40', // Texto oscuro para entrada de búsqueda
  },
  searchButton: {
    backgroundColor: '#007bff', // Azul moderno para el botón
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#ffffff', // Blanco para el texto del botón
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    backgroundColor: '#ffffff', // Fondo blanco limpio para las tablas
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    borderColor: '#dee2e6', // Gris claro para el borde
    borderWidth: 1,
    elevation: 2, // Sombras ligeras para resaltar la tabla
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e9ecef', // Fondo gris claro para encabezados
    padding: 10,
  },
  tableHeaderText: {
    color: '#495057', // Texto gris oscuro para encabezados
    fontWeight: '600',
    width: '33%',
    textAlign: 'center',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6', // Línea divisoria entre filas
  },
  tableCell: {
    color: '#343a40', // Texto oscuro para las celdas
    width: '33%',
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007bff', // Azul moderno para botones
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff', // Blanco para texto en botones
    fontWeight: 'bold',
    fontSize: 14,
  },
  noResultsText: {
    textAlign: 'center',
    color: '#6c757d', // Texto gris para indicar "sin resultados"
    marginTop: 20,
    fontSize: 16,
  },
});


export default List;
