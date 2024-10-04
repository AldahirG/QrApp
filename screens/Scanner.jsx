import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert as RNAlert, ImageBackground } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config'; // Importing the BASE_URL from config.js

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      const userId = data; // Assuming the scanned data is the user ID
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/registros/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ asistio: true }),
      });

      if (response.ok) {
        RNAlert.alert(
          "Confirmado",
          "Asistencia confirmada exitosamente.",
          [
            { text: "OK", onPress: () => setScanned(false) }
          ],
          { cancelable: false }
        );
      } else {
        RNAlert.alert("Error", "No se pudo actualizar la asistencia.");
        setScanned(false);
      }
    } catch (error) {
      RNAlert.alert("Error", "Hubo un error durante la actualización.");
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se tiene acceso a la cámara</Text>;
  }

  return (
    <ImageBackground
      source={require('../assets/banner.jpg')} // Importing the banner image as background
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Escanear Código QR</Text>
        <View style={styles.qrContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
        {scanned && (
          <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.buttonText}>Toca para escanear de nuevo</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background covers the entire view
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f9a602", // Bright orange/yellow color for the header text
    marginBottom: 20,
    textAlign: 'center',
  },
  qrContainer: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#8a2466', // Border color matching the theme
    borderWidth: 2,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#8a2466", // Purple color for the button
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
