import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  View,
  Alert,
} from "react-native";
import LineChartComponent from "../Components/LineChartComponent";
import mockData from "../Mock/mockData.json";
import Grafico from "../Components/VisualGraph";
import SafetyIndicator from "../Components/SafetyIndicator";

const windowWidth = Dimensions.get("window").width;

interface Record {
  id: number;
  sensort: number;
  servo_vertical: number;
  created_at: string;
}

/**
 * Main component for the application.
 */
export default function App() {
  // State variables initialization
  const [showServoVertical, setShowServoVertical] = useState(true);
  const [data, setData] = useState(mockData);
  const [chartComponentKey, setChartComponentKey] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState("lightblue");
  const [securyMode, setSecuryMode] = useState(false);
  const [initialServoVertical, setInitialServoVertical] = useState(0);

  // Dynamic data for the chart
  const chartTitle = showServoVertical ? "Servo Motor Angle" : "Voltage";
  const chartData = data.map((record) =>
    showServoVertical ? record.servo_vertical : record.sensort
  );
  const chartXData = data.map((record) => record.created_at);

  // Toggles between displaying Servo Motor and Voltage in the chart
  const toggleChart = () => {
    setShowServoVertical((prevShow) => !prevShow);
    fetchDataFromJson();
  };

  // Confirms the toggle of the security mode with an alert
  const confirmToggleSecuryMode = () => {
    Alert.alert(
      `Confirm Security Mode ${securyMode ? "Deactivation" : "Activation"}`,
      `Do you want to ${
        securyMode ? "deactivate" : "activate"
      } the Security Mode?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: toggleSecuryMode,
        },
      ],
      { cancelable: false }
    );
  };

  // Toggles the security mode and sends a request to update it
  const toggleSecuryMode = async () => {
    try {
      setSecuryMode((prevMode) => !prevMode);

      const url = "http://carlosgfkp.pythonanywhere.com/api/secury-mode/1/";

      const data = {
        secury_mode: !securyMode,
      };

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log("Data sent successfully:", jsonData);

      Alert.alert(
        "Security Mode",
        `Security mode ${
          securyMode ? "deactivated" : "activated"
        } successfully!`
      );
    } catch (error: any) {
      console.error("Error sending data:", error.message);
      Alert.alert("Error", "Error sending data to the server");
    }
  };

  // Fetches data from a JSON source
  const fetchDataFromJson = () => {
    const newData = [...mockData]; // Create a copy of the array to avoid unexpected mutations
    setData(newData);
    setChartComponentKey((prevKey) => prevKey + 1);

    // Update the initial value of servoVertical
    if (newData.length > 0) {
      setInitialServoVertical(newData[0].servo_vertical);
    }
  };

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchDataFromJson();
  }, []);

  // useEffect hook to fetch data at intervals
  useEffect(() => {
    const intervalId = setInterval(fetchDataFromJson, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // useEffect hook to update background color based on time
  useEffect(() => {
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 18;

    setBackgroundColor(isNight ? "darkblue" : "lightblue");
  }, []);

  // Rendering the UI components
  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Solar Panel Monitoring</Text>
      </View>

      <View style={styles.headerContainer}>
        {/* Pass initialServoVertical as a property to the Grafico component */}
        <Grafico servo_vertical={initialServoVertical} />
      </View>

      <View style={styles.secondContainer}>
        <View style={styles.sectionContainer}>
          <LineChartComponent
            key={chartComponentKey}
            yAxisLabel={""}
            yAxisSuffix={showServoVertical ? "º" : "V"}
            chartTitle={chartTitle}
            data={chartData}
            chartXData={chartXData}
            chartStyle={styles.chartStyle}
            titleStyle={styles.chartTitleStyle}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleChart}>
              <Text style={styles.toggleButtonText}>
                {showServoVertical ? "View Voltage" : "View Angle"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toggleButton}
              onPress={confirmToggleSecuryMode}
            >
              <Text style={styles.toggleButtonText}>Security Mode</Text>
              <SafetyIndicator active={securyMode} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Styles for the components in the App.
 */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    position: "relative",
  },
  header: {
    backgroundColor: "#f0f0f0",
    position: "relative",
    width: "100%",
    height: 110,
    bottom: 20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#3f51b5",
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 40,
  },
  headerContainer: {},
  secondContainer: {
    borderRadius: 10,
    paddingTop: 10,
    position: "absolute",
    zIndex: 1,
    top: 360,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  sectionContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 70,
    paddingHorizontal: 20,
    paddingTop: 30,
    height: 510,
    marginBottom: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 20,
  },
  toggleButton: {
    backgroundColor: "lightblue",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 160,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3f51b5",
    justifyContent: "center",
    textAlign: "center",
    width: "auto",
  },
  infoContainer: {
    width: windowWidth,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  infoText: {
    color: "#333",
  },
  chartStyle: {
    backgroundColor: "#f0f0f0",
  },
  chartTitleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3f51b5",
  },
});
