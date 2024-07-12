import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(async () => {
      const token = await AsyncStorage.getItem('token');
      const parsedData = JSON.parse(data);
      navigation.navigate('ShowInfo', { data: parsedData });
    });
  };

  if (hasPermission === null) {
    return <Text>Permisos de Cámara</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const animatedStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>QR de Asistencia</Text>
      </View>
      <Animated.View style={[styles.qrContainer, animatedStyle]}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    top: 60,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  qrContainer: {
    width: 250,
    height: 250,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  button: {
    position: "absolute",
    bottom: 60,
    backgroundColor: "#800080",
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
