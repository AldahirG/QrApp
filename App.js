import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

// Pantallas
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import List from './screens/List';
import ShowInfo from './screens/ShowInfo';
import Scanner from './screens/Scanner';
import Assistences from './screens/Assistences';
import Register from './screens/Register';
import Settings from './screens/Settings'; // ⬅️ nueva pantalla de configuración

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack interno para la pantalla List + ShowInfo
function ListStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="List">
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="ShowInfo" component={ShowInfo} />
    </Stack.Navigator>
  );
}

// Navegación principal de pestañas
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'ListStack':
              iconName = 'list';
              break;
            case 'Register':
              iconName = 'person-add';
              break;
            case 'Scanner':
              iconName = 'qr-code-scanner';
              break;
            case 'Assistences':
              iconName = 'content-paste';
              break;
            case 'Settings':
              iconName = 'settings';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#6c757d',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#dee2e6',
          elevation: 2,
        },
        headerStyle: {
          backgroundColor: '#f8f9fa',
          borderBottomWidth: 1,
          borderBottomColor: '#dee2e6',
          elevation: 1,
        },
        headerTintColor: '#343a40',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
      <Tab.Screen name="ListStack" component={ListStack} options={{ title: 'Registros' }} />
      <Tab.Screen name="Register" component={Register} options={{ title: 'Registro' }} />
      <Tab.Screen name="Scanner" component={Scanner} />
      <Tab.Screen name="Assistences" component={Assistences} options={{ title: 'Asistencias' }} />
      <Tab.Screen name="Settings" component={Settings} options={{ title: 'Ajustes' }} />
    </Tab.Navigator>
  );
}

// App principal con stack de navegación
function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Main" component={MyTabs} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

export default App;
