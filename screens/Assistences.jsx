import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

const Assistences = () => {
  const [assistances, setAssistances] = useState([]);
  const [programs, setPrograms] = useState([]);
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

  // const fetchPrograms = async () => {
  //   setLoading(true);
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     const response = await fetch(`${BASE_URL}/api/registros/programs`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     setPrograms(data);
  //   } catch (error) {
  //     console.error('Error fetching programs:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
    // fetchPrograms();
    fetchConfirmedAssistances();
    fetchAssistancesByPrograma();
  };

  const renderAssistanceItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.invito || 'Ninguno'}</Text> {/* Mostrar "Ninguno" si es null */}
      <Text style={[styles.cell, styles.cellRight]}>{item.total}</Text>
    </View>
  );

  const renderProgramItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.programa || 'Ninguno'}</Text> {/* Mostrar "Ninguno" si es null */}
      <Text style={[styles.cell, styles.cellRight]}>{item.total}</Text>
    </View>
  );

  const renderConfirmedAssistanceItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.invito || 'Ninguno'}</Text> {/* Mostrar "Ninguno" si es null */}
      <Text style={[styles.cell, styles.cellRight]}>{item.total}</Text>
    </View>
  );

  const renderAssistanceByProgramaItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.programa || 'Ninguno'}</Text> {/* Mostrar "Ninguno" si es null */}
      <Text style={[styles.cell, styles.cellRight]}>{item.total}</Text>
    </View>
  );

  return (
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

      {/* Programa de Interés */}
      {/* <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>Programa </Text>
        <View style={styles.rowHeader}>
          <Text style={[styles.cell, styles.headerCell]}>Programa</Text>
          <Text style={[styles.cell, styles.headerCellRight]}>Total</Text>
        </View>
        <FlatList
          data={programs}
          renderItem={renderProgramItem}
          keyExtractor={(item) => item.programa}
          ListFooterComponent={() => (
            <View style={styles.rowFooter}>
              <Text style={styles.cellFooter}>Total general</Text>
              <Text style={[styles.cell, styles.cellFooterRight]}>
                {programs.reduce((acc, item) => acc + item.total, 0)}
              </Text>
            </View>
          )}
        />
      </View> */}

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
        <Text style={styles.tableHeader}>Asistencias por Programa</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#025FF5',
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
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    margin: 10,
    textAlign: 'center',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rowFooter: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f2f2f2',
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  cellRight: {
    textAlign: 'right',
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#333',
  },
  headerCellRight: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  cellFooter: {
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 10,
  },
  cellFooterRight: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    paddingHorizontal: 10,
  },
});

export default Assistences;
