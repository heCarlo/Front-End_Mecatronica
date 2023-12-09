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
import SafetyIndicator from "../Components/SafetyIndicator"; // Importa o novo componente

const windowWidth = Dimensions.get("window").width;

interface Record {
  id: number;
  sensort: number;
  servo_vertical: number;
  created_at: string;
}

const getLastTenRecords = (data: Record[]) => data.slice(0, 7);

export default function App() {
  const [showServoVertical, setShowServoVertical] = useState(true);
  const [data, setData] = useState(getLastTenRecords(mockData));
  const [chartComponentKey, setChartComponentKey] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState("lightblue");
  const [securyMode, setSecuryMode] = useState(false);

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
      // Altera o valor do securyMode localmente
      setSecuryMode((prevMode) => !prevMode);

      // Gera um valor aleatório para sensort e servo_vertical (substitua por lógica real)
      const randomSensort = Math.floor(Math.random() * 5);
      const randomServoVertical = Math.floor(Math.random() * 180);

      const url =
        "http://carlosgfkp.pythonanywhere.com/api/sensor-data/create/secury-mode";

      const data = {
        secury_mode: !securyMode, // Altere aqui conforme necessário
      };

      // Envia a requisição POST para o servidor
      const response = await fetch(url, {
        method: "POST",
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

      // Adiciona um alerta para informar o usuário sobre a alteração no modo de segurança
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
    const newData = getLastTenRecords(mockData);
    setData(newData);
    setChartComponentKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    fetchDataFromJson();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(fetchDataFromJson, 500);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const hora = new Date().getHours();
    const isNoite = hora < 6 || hora >= 18;

    // Atualiza a cor de fundo com base no horário
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
        <Grafico />
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

            {/* Adiciona o indicador de segurança */}

            <TouchableOpacity
              style={styles.toggleButton}
              onPress={confirmToggleSecuryMode}
            >
              <Text style={styles.toggleButtonText}>
                Modo Segurança
              </Text>
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
    height: 100,
    bottom: 20,
    borderRadius: 50,
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
    gap: 20
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
    justifyContent: "center"
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
