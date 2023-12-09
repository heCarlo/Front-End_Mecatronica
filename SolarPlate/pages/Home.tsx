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

export default function App() {
  const [showServoVertical, setShowServoVertical] = useState(true);
  const [data, setData] = useState(mockData);
  const [chartComponentKey, setChartComponentKey] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState("lightblue");
  const [securyMode, setSecuryMode] = useState(false);
  const [initialServoVertical, setInitialServoVertical] = useState(0);

  const chartTitle = showServoVertical ? "Servo Vertical" : "Tensão";
  const chartData = data.map((record) =>
    showServoVertical ? record.servo_vertical : record.sensort
  );
  const chartXData = data.map((record) => record.created_at);

  const toggleChart = () => {
    setShowServoVertical((prevShow) => !prevShow);
    fetchDataFromJson();
  };

  const confirmToggleSecuryMode = () => {
    Alert.alert(
      `Confirmar Modo de Segurança ${securyMode ? "Desativação" : "Ativação"}`,
      `Deseja ${
        securyMode ? "desativar" : "ativar"
      } o Modo de Segurança?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: toggleSecuryMode,
        },
      ],
      { cancelable: false }
    );
  };

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
        "Modo de Segurança",
        `Modo de segurança ${
          securyMode ? "desativado" : "ativado"
        } com sucesso!`
      );
    } catch (error: any) {
      console.error("Error sending data:", error.message);
      Alert.alert("Erro", "Erro ao enviar dados para o servidor");
    }
  };

  const fetchDataFromJson = () => {
    const newData = [...mockData]; // Criar uma cópia da array para evitar mutações inesperadas
    setData(newData);
    setChartComponentKey((prevKey) => prevKey + 1);

    // Atualiza o valor inicial de servoVertical
    if (newData.length > 0) {
      setInitialServoVertical(newData[0].servo_vertical);
    }
  };

  useEffect(() => {
    fetchDataFromJson();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchDataFromJson, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const hora = new Date().getHours();
    const isNoite = hora < 6 || hora >= 18;

    setBackgroundColor(isNoite ? "darkblue" : "lightblue");
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor }]}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Monitoramento de Placa Solar</Text>
      </View>

      <View style={styles.headerContainer}>
        {/* Passa initialServoVertical como propriedade para o componente Grafico */}
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
                {showServoVertical ? "Observar Tensão" : "Observar Angulação"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toggleButton}
              onPress={confirmToggleSecuryMode}
            >
              <Text style={styles.toggleButtonText}>Modo Segurança</Text>
              <SafetyIndicator active={securyMode} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

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
