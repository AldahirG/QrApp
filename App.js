import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import Scanner from './screens/Scanner';
import Home from './screens/Home';
import List from './screens/List';
import ShowInfo from './screens/ShowInfo';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    async function prepare() {
      try {
        // Mantén la pantalla de splash visible mientras se cargan los recursos
        await SplashScreen.preventAutoHideAsync();
        // Simula una tarea de carga (puede ser una llamada API, por ejemplo)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Oculta la pantalla de splash una vez que los recursos estén listos
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="ShowInfo" component={ShowInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
