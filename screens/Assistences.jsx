import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

const Assistences = () => {
  const [assistances, setAssistances] = useState([]);
  const [confirmedAssistances, setConfirmedAssistances] = useState([]);
  const [assistancesByPrograma, setAssistancesByPrograma] = useState([]);
  const [loading, setLoading] = useState(false);

  const conferencista = 'ONE DAY UNINTER NOVIEMBRE 2024';

  const fetchAssistances = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/registros/assistancesByNombreInvito/${encodeURIComponent(conferencista)}`);
      if (!response.ok) {
        throw new Error('Error al obtener asistencias por invitador');
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
      const response = await fetch(`${BASE_URL}/api/registros/confirmedAssistancesByNombreInvito/${encodeURIComponent(conferencista)}`);
      if (!response.ok) {
        throw new Error('Error al obtener asistencias confirmadas');
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
      const response = await fetch(`${BASE_URL}/api/registros/assistancesByProgramaInteres/${encodeURIComponent(conferencista)}`);
      if (!response.ok) {
        throw new Error('Error al obtener asistencias por programa');
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

  const renderFooter = (data) => (
    <View style={styles.rowFooter}>
      <Text style={styles.cellFooter}>Total</Text>
      <Text style={[styles.cell, styles.cellFooterRight]}>
        {data.reduce((acc, item) => acc + item.total, 0)}
      </Text>
    </View>
  );

  const renderAssistanceItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.Nombre_invito}</Text>
      <Text style={[styles.cell, styles.cellRight]}>{item.total}</Text>
    </View>
  );

  const renderConfirmedAssistanceItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.Nombre_invito}</Text>
      <Text style={[styles.cell, styles.cellRight]}>{item.total}</Text>
    </View>
  );

  const renderAssistanceByProgramaItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.programaInteres}</Text>
      <Text style={[styles.cell, styles.cellRight]}>{item.total}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/banner.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Reportes</Text>

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>{loading ? 'Cargando...' : 'Buscar'}</Text>
        </TouchableOpacity>

        {/* Asistencias por Invitador */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Asistencias por Invitador</Text>
          <FlatList
            data={assistances}
            renderItem={renderAssistanceItem}
            keyExtractor={(item) => item.Nombre_invito}
            ListFooterComponent={() => renderFooter(assistances)}
          />
        </View>

        {/* Asistencias Confirmadas */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Asistencias Confirmadas</Text>
          <FlatList
            data={confirmedAssistances}
            renderItem={renderConfirmedAssistanceItem}
            keyExtractor={(item) => item.Nombre_invito}
            ListFooterComponent={() => renderFooter(confirmedAssistances)}
          />
        </View>

        {/* Asistencias por Programa */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Asistencias por Programa</Text>
          <FlatList
            data={assistancesByPrograma}
            renderItem={renderAssistanceByProgramaItem}
            keyExtractor={(item) => item.programaInteres}
            ListFooterComponent={() => renderFooter(assistancesByPrograma)}
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
    backgroundColor: '#f8f9fa', 
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40', // Texto oscuro para mayor legibilidad
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff', // Azul moderno y minimalista para el botón
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff', // Blanco puro para el texto del botón
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableContainer: {
    backgroundColor: '#ffffff', // Fondo blanco limpio para las tablas
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    borderColor: '#dee2e6', 
    borderWidth: 1,
    elevation: 2, 
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057', 
    marginVertical: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6', 
  },
  rowFooter: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    backgroundColor: '#e9ecef', 
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    paddingHorizontal: 10,
    color: '#495057', 
    fontSize: 14,
  },
  cellRight: {
    textAlign: 'right',
  },
  cellFooter: {
    fontWeight: 'bold',
    color: '#212529', 
    paddingHorizontal: 10,
    fontSize: 14,
  },
  cellFooterRight: {
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'right',
    paddingHorizontal: 10,
    fontSize: 14,
  },
});

export default Assistences;
