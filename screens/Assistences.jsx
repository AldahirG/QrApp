import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

const Assistences = () => {
  const [assistances, setAssistances] = useState([]);
  const [confirmedAssistances, setConfirmedAssistances] = useState([]);
  const [assistancesByPrograma, setAssistancesByPrograma] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAssistances = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/registros/assistances`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAssistances(data);
    } catch (error) {
      console.error('Error fetching assistances:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfirmedAssistances = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/registros/confirmedAssistances`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setConfirmedAssistances(data);
    } catch (error) {
      console.error('Error fetching confirmed assistances:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssistancesByPrograma = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/registros/assistancesByPrograma`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAssistancesByPrograma(data);
    } catch (error) {
      console.error('Error fetching assistances by programa:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchAssistances();
    fetchConfirmedAssistances();
    fetchAssistancesByPrograma();
  };

  const renderAssistanceItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.invito || 'Ninguno'}</Text>
      <Text style={[styles.cell, styles.cellRight]}>{item.total}</Text>
    </View>
  );

  const renderConfirmedAssistanceItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.invito || 'Ninguno'}</Text>
      <Text style={[styles.cell, styles.cellRight]}>{item.total}</Text>
    </View>
  );

  const renderAssistanceByProgramaItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.programa || 'Ninguno'}</Text>
      <Text style={[styles.cell, styles.cellRight]}>{item.total}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/banner.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Asistencias por Invitador, Programa y Confirmados</Text>

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Buscar'}</Text>
        </TouchableOpacity>

        {/* Asistencias por Invitador */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Asistencias por Invitador</Text>
          <View style={styles.rowHeader}>
            <Text style={[styles.cell, styles.headerCell]}>Quien invitó</Text>
            <Text style={[styles.cell, styles.headerCellRight]}>Total</Text>
          </View>
          <FlatList
            data={assistances}
            renderItem={renderAssistanceItem}
            keyExtractor={(item) => item.invito}
            ListFooterComponent={() => (
              <View style={styles.rowFooter}>
                <Text style={styles.cellFooter}>Total general</Text>
                <Text style={[styles.cell, styles.cellFooterRight]}>
                  {assistances.reduce((acc, item) => acc + item.total, 0)}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Total de Asistentes Confirmados */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Total de Asistentes Confirmados</Text>
          <View style={styles.rowHeader}>
            <Text style={[styles.cell, styles.headerCell]}>Quien invitó</Text>
            <Text style={[styles.cell, styles.headerCellRight]}>Total</Text>
          </View>
          <FlatList
            data={confirmedAssistances}
            renderItem={renderConfirmedAssistanceItem}
            keyExtractor={(item) => item.invito}
            ListFooterComponent={() => (
              <View style={styles.rowFooter}>
                <Text style={styles.cellFooter}>Total general</Text>
                <Text style={[styles.cell, styles.cellFooterRight]}>
                  {confirmedAssistances.reduce((acc, item) => acc + item.total, 0)}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Asistencias por Programa */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Registros por Grado</Text>
          <View style={styles.rowHeader}>
            <Text style={[styles.cell, styles.headerCell]}>Programa</Text>
            <Text style={[styles.cell, styles.headerCellRight]}>Total</Text>
          </View>
          <FlatList
            data={assistancesByPrograma}
            renderItem={renderAssistanceByProgramaItem}
            keyExtractor={(item) => item.programa}
            ListFooterComponent={() => (
              <View style={styles.rowFooter}>
                <Text style={styles.cellFooter}>Total general</Text>
                <Text style={[styles.cell, styles.cellFooterRight]}>
                  {assistancesByPrograma.reduce((acc, item) => acc + item.total, 0)}
                </Text>
              </View>
            )}
          />
        </View>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f9a602',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8a2466',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  tableContainer: {
    backgroundColor: '#8a2466',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    borderColor: '#f9a602', // Naranja para el borde
    borderWidth: 1,
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    margin: 10,
    textAlign: 'center',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#8a2466',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f9a602',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f9a602',
  },
  rowFooter: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f9a602',
    backgroundColor: '#8a2466',
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    paddingHorizontal: 10,
    color: '#fff',
  },
  cellRight: {
    textAlign: 'right',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#fff',
  },
  headerCellRight: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  cellFooter: {
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 10,
  },
  cellFooterRight: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
    paddingHorizontal: 10,
  },
});

export default Assistences;
