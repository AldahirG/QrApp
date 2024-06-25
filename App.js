import * as React from 'react';
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
import Login from './screens/Login';

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
          } else if (route.name === 'Scanner') {
            iconName = 'qr-code-scanner';
          } else if (route.name === 'Assistences') {
            iconName = 'content-paste';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Inicio' }} />
      <Tab.Screen name="ListStack" component={ListStack} options={{ title: 'Registros' }} />
      <Tab.Screen name="Scanner" component={Scanner} />
      <Tab.Screen name="Assistences" component={Assistences} options={{ title: 'Asistencias' }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={MyTabs} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}

export default App;
