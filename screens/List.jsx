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

import { BASE_URL } from '../config';
import { getEventoSeleccionado } from '../utils/storage';
import { useThemeColors } from '../theme/colors';

const List = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigation = useNavigation();
  const colors = useThemeColors();

  const normalizeText = (text) => {
    return text
      ? text
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
      : '';
  };

  const fetchUsers = async () => {
    try {
      const conferencista = await getEventoSeleccionado();
      if (!conferencista) return;

      const response = await fetch(
        `${BASE_URL}/api/registros?conferencista=${encodeURIComponent(conferencista)}`
      );

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
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
      style={[styles.background, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.header, { color: colors.text }]}>Registros</Text>

        <View
          style={[
            styles.searchContainer,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons name="search" size={20} color={colors.mutedText} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar usuarios"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={colors.placeholder}
          />
        </View>

        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: colors.primary }]}
          onPress={handleSearch}
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>

        {showResults && (
          filteredUsers.length > 0 ? (
            <View
              style={[
                styles.tableContainer,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <View
                style={[styles.tableHeader, { backgroundColor: colors.header }]}
              >
                <Text style={[styles.tableHeaderText, { color: colors.text }]}>Nombre</Text>
                <Text style={[styles.tableHeaderText, { color: colors.text }]}>Teléfono</Text>
                <Text style={[styles.tableHeaderText, { color: colors.text }]}>Acciones</Text>
              </View>
              {filteredUsers.map((user) => (
                <View
                  key={user.idregistro_conferencias}
                  style={[styles.tableRow, { borderBottomColor: colors.border }]}
                >
                  <Text style={[styles.tableCell, { color: colors.text }]}>
                    {user?.nombre || 'Sin nombre'}
                  </Text>
                  <Text style={[styles.tableCell, { color: colors.text }]}>
                    {user?.telefono || 'Sin teléfono'}
                  </Text>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.primary }]}
                    onPress={() => navigation.navigate('ShowInfo', { data: user })}
                  >
                    <Text style={styles.buttonText}>Ver</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.noResultsText, { color: colors.mutedText }]}>
              No se encontraron usuarios
            </Text>
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
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    borderWidth: 1,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
  },
  searchButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  tableHeaderText: {
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
  },
  tableCell: {
    width: '33%',
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default List;
