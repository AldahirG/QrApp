import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './theme/colors';

// Pantallas
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import List from './screens/List';
import ShowInfo from './screens/ShowInfo';
import Scanner from './screens/Scanner';
import Assistences from './screens/Assistences';
import Register from './screens/Register';
import Settings from './screens/Settings';

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
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? darkColors : lightColors;

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
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 2,
        },
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          elevation: 1,
        },
        headerTintColor: colors.text,
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
