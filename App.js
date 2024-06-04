import React from "react";
import Scanner from "./screens/Scanner";
import Home from "./screens/Home";
import List from "./screens/List";
import ShowInfo from "./screens/ShowInfo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  return (
   
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name= "List" component={List} />
        <Stack.Screen name= "ShowInfo" component={ShowInfo} />
      </Stack.Navigator>
    
  );
}

export default () => {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}