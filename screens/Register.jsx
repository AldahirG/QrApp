import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../config";
import moment from "moment";
import { getProgramOptions } from "../constants/programasPorNivel";
import { opcionesInvito } from "../constants/opcionesInvito";
import { getEventoSeleccionado } from "../utils/storage";
import { FadeInUp, MotiView } from "moti";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nivelEstudios, setNivelEstudios] = useState("");
  const [nombreInvito, setNombreInvito] = useState("");
  const [alumno, setAlumno] = useState("");
  const [tipo] = useState("SESIÓN INFORMATIVA");
  const [escProc, setEscProc] = useState("");
  const [nivelUninter, setNivelUninter] = useState("");
  const [programaInteres, setProgramaInteres] = useState("");
  const [asistio, setAsistio] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (
      !nombre ||
      !correo ||
      !telefono ||
      !nivelEstudios ||
      !nombreInvito ||
      !alumno ||
      !asistio
    ) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Por favor, completa todos los campos obligatorios.",
      });
      return;
    }

    setLoading(true);
    try {
      const conferencista = await getEventoSeleccionado();
      if (!conferencista) throw new Error("No hay evento seleccionado.");

      const payload = {
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        telefono: telefono.trim(),
        Nivel_Estudios: nivelEstudios,
        Conferencista: conferencista,
        Nombre_invito: nombreInvito,
        fecha_registro: moment().toISOString(),
        alumno,
        tipo,
        escProc,
        NivelUninter: nivelUninter,
        programaInteres,
        asistio,
      };

      const response = await fetch(
        `${BASE_URL}/api/registros/create?conferencista=${encodeURIComponent(
          conferencista
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        Toast.show({ type: "success", text1: "Registro creado exitosamente" });
        // Limpiar campos
        setNombre("");
        setCorreo("");
        setTelefono("");
        setNivelEstudios("");
        setNombreInvito("");
        setAlumno("");
        setEscProc("");
        setNivelUninter("");
        setProgramaInteres("");
        setAsistio("");
        setTimeout(() => navigation.navigate("Home"), 2000);
      } else {
        alert("Error al crear el registro");
        console.error("Servidor:", result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/banner.jpg")}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 800 }}
        >
          <Image
            source={require("../assets/uninterlogo.png")}
            style={styles.logo}
          />
          <Text style={styles.header}>Nuevo Registro</Text>
        </MotiView>

        {[
          // Animación en cascada
          ["Nombre", nombre, setNombre, "Ingresa el nombre", "default"],
          ["Correo", correo, setCorreo, "Ingresa el correo", "email-address"],
          [
            "Teléfono",
            telefono,
            setTelefono,
            "Ingresa el teléfono",
            "phone-pad",
          ],
        ].map(([label, value, setter, placeholder, keyboardType], index) => (
          <MotiView
            key={label}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 100 * index }}
          >
            <View style={styles.infoBox}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={setter}
                placeholder={placeholder}
                keyboardType={keyboardType}
                placeholderTextColor="#bbb"
              />
            </View>
          </MotiView>
        ))}

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 300 }}
        >
          <View style={styles.infoBox}>
            <Text style={styles.label}>Nivel de Estudios</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={nivelEstudios}
                onValueChange={(itemValue) => {
                  setNivelEstudios(itemValue);
                  setProgramaInteres("");
                }}
                style={styles.input}
              >
                <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
                <Picker.Item label="SECUNDARIA" value="SECUNDARIA" />
                <Picker.Item label="BACHILLERATO" value="BACHILLERATO" />
                <Picker.Item label="UNIVERSIDAD" value="UNIVERSIDAD" />
                <Picker.Item label="POSGRADO" value="POSGRADO" />
              </Picker>
            </View>
          </View>
        </MotiView>

        {nivelEstudios !== "" && (
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 400 }}
          >
            <View style={styles.infoBox}>
              <Text style={styles.label}>Programa de Interés</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={programaInteres}
                  onValueChange={setProgramaInteres}
                  style={styles.input}
                >
                  <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
                  {getProgramOptions(nivelEstudios).map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                  ))}
                </Picker>
              </View>
            </View>
          </MotiView>
        )}

        {[
          ["Escuela de Procedencia", escProc, setEscProc],
          ["¿Eres alumno Uninter?", alumno, setAlumno, ["SI", "NO"]],
          ["¿Asistirás al evento?", asistio, setAsistio, ["SI", "NO"]],
          [
            "¿Quién te invitó?",
            nombreInvito,
            setNombreInvito,
            opcionesInvito.map((o) => o.label),
          ],
        ].map(([label, value, setter, opciones], idx) => (
          <MotiView
            key={label}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 500 + idx * 100 }}
          >
            <View style={styles.infoBox}>
              <Text style={styles.label}>{label}</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={value}
                  onValueChange={setter}
                  style={styles.input}
                >
                  <Picker.Item label="SELECCIONA UNA OPCIÓN" value="" />
                  {Array.isArray(opciones)
                    ? opciones.map((op) => (
                        <Picker.Item key={op} label={op} value={op} />
                      ))
                    : opcionesInvito.map(({ label, value }) => (
                        <Picker.Item key={value} label={label} value={value} />
                      ))}
                </Picker>
              </View>
            </View>
          </MotiView>
        ))}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Registrando..." : "Registrar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center" },
  container: { flexGrow: 1, padding: 20 },
  logo: { width: 100, height: 100, alignSelf: "center", marginBottom: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 20,
    textAlign: "center",
  },
  infoBox: {
    marginBottom: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    borderColor: "#dee2e6",
    borderWidth: 1,
    elevation: 1,
  },
  label: { fontSize: 16, color: "#495057", marginBottom: 5, fontWeight: "500" },
  input: {
    height: 40,
    borderColor: "#dee2e6",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    color: "#343a40",
    fontSize: 14,
  },
  pickerContainer: {
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: 10,
    elevation: 2,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 5,
  },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});

export default Register;
