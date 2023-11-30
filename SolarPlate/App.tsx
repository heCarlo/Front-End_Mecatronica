import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import LineChartComponent from "./Components/LineChart/LineChartComponent";
import ToggleSwitch from "./Components/ToggleSwitch/toggleSwitch";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Home Page</Text>
      </View>

      <LineChartComponent
        yAxisLabel={""}
        yAxisSuffix={"V"}
        chartTitle={"Sensor Tensão"}
      />

      <View style={styles.rectangle}>
        <Text style={styles.rectangleText}>Sensor Tensão</Text>
      </View>

      <LineChartComponent
        yAxisLabel={""}
        yAxisSuffix={"º"}
        chartTitle={"Servo Vertical"}
      />

      <View style={styles.rectangle}>
        <Text style={styles.rectangleText}>Angulo da Placa: 40°</Text>
      </View>

      <ToggleSwitch />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    display: "flex",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  rectangle: {
    width: 300,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  rectangleText: {
    color: "black",
  },
});
