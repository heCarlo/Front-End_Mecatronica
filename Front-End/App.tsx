import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import HomeScreen from "./pages/Home";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "transparent",
            borderBottomWidth: 0,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Solar Plate Monitoring"
          component={HomeScreen}
          options={{
            headerBackground: () => (
              <View style={{ backgroundColor: "lightblue", flex: 1 }} />
            ),
            header: () => (
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
