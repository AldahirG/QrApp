import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Scanner from "./screens/Scanner";
import List from "./screens/List";
import ShowInfo from "./screens/ShowInfo";
import Assistences from "./screens/Assistences";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="ShowInfo" component={ShowInfo} />
        <Stack.Screen name="Assistences" component={Assistences} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
