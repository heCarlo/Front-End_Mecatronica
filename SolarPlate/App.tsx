import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./pages/Home";
import AboutScreen from "./pages/About";
import pageSafetyMode from "./pages/pageSafetyMode";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sobre" component={AboutScreen} />
        <Stack.Screen name="pageSafetyMode" component={pageSafetyMode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
