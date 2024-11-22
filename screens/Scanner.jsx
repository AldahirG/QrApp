import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Toast from "react-native-toast-message";
import { BASE_URL } from '../config';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const conferencista = 'ONE DAY UNINTER NOVIEMBRE 2024';

    try {
      // Obtener registro por ID desde el QR
      const getResponse = await fetch(`${BASE_URL}/api/registros/get/${data}/${encodeURIComponent(conferencista)}`);
      if (!getResponse.ok) {
        throw new Error('Error al obtener el registro');
      }
      const record = await getResponse.json();

      // Actualizar el registro con "asistio: SI"
      const updateResponse = await fetch(`${BASE_URL}/api/registros/update/${data}/${encodeURIComponent(conferencista)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...record,
          asistio: 'SI',
        }),
      });

      if (updateResponse.ok) {
        Toast.show({
          type: 'success',
          text1: 'Éxito',
          text2: 'El registro ha sido actualizado correctamente.',
        });
        setScanned(false);
      } else {
        throw new Error('Error al actualizar el registro');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se concedió acceso a la cámara</Text>;
  }

  return (
    <ImageBackground
      source={require('../assets/banner.jpg')}
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
            <Text style={styles.buttonText}>Escanear de nuevo</Text>
          </TouchableOpacity>
        )}
      </View>
      <Toast />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
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
    color: "#003DA6", // Azul principal para encabezado
    marginBottom: 20,
    textAlign: 'center',
  },
  qrContainer: {
    width: 300,
    height: 300,
    backgroundColor: "#FFFFFF", // Fondo blanco del lector
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#003DA6', // Azul principal para el borde
    borderWidth: 2,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#003DA6", // Púrpura para el botón
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
