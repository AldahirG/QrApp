import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

import Home from './screens/Home';
import List from './screens/List';
import ShowInfo from './screens/ShowInfo';
import Scanner from './screens/Scanner';
import Assistences from './screens/Assistences';
import Register from './screens/Register'; // Import the new Register screen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ListStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="List"
    >
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="ShowInfo" component={ShowInfo} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'ListStack') {
            iconName = 'list';
          } else if (route.name === 'Register') {
            iconName = 'person-add';
          } else if (route.name === 'Scanner') {
            iconName = 'qr-code-scanner';
          } else if (route.name === 'Assistences') {
            iconName = 'content-paste';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff', // Azul moderno para el ícono activo
        tabBarInactiveTintColor: '#6c757d', // Gris neutro para íconos inactivos
        tabBarStyle: {
          backgroundColor: '#ffffff', // Fondo blanco limpio para la barra de pestañas
          borderTopWidth: 1, // Línea superior sutil para separación
          borderTopColor: '#dee2e6', // Gris claro para la línea superior
          elevation: 2, // Sombras ligeras para dar profundidad
        },
        headerStyle: {
          backgroundColor: '#f8f9fa', // Fondo claro para el encabezado
          borderBottomWidth: 1, // Línea inferior sutil para separación
          borderBottomColor: '#dee2e6', // Gris claro para la línea inferior
          elevation: 1, // Sombra ligera para resaltar el encabezado
        },
        headerTintColor: '#343a40', // Gris oscuro para el texto del encabezado
        
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
      <Tab.Screen name="ListStack" component={ListStack} options={{ title: 'Registros' }} />
      <Tab.Screen name="Register" component={Register} options={{ title: 'Registro' }} /> 
      <Tab.Screen name="Scanner" component={Scanner} />
      <Tab.Screen name="Assistences" component={Assistences} options={{ title: 'Asistencias' }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
          <Stack.Screen name="Main" component={MyTabs} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

export default App;
