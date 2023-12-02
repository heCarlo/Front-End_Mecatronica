import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import LineChartComponent from './Components/LineChart/LineChartComponent';
import ToggleSwitch from './Components/ToggleSwitch/toggleSwitch';
import mockData from './Mock/mockData.json';

// Defina o tipo para os registros do JSON
interface Record {
  created_at: string;
  value: number;
  sensort: number;
  servo_vertical: number;
  secury_mode: boolean;
}

// Função para extrair os últimos 10 registros do JSON
const getLastTenRecords = (data: Record[]) => {
  const lastTenRecords = data.slice(0, 10);
  return lastTenRecords;
};

export default function App() {
  // Extrair os últimos 10 registros para "Servo Vertical" e "Sensor Tensão"
  const lastTenRecords = getLastTenRecords(mockData);

  const lastTenServoVertical = lastTenRecords.map((record) => record.servo_vertical);
  const lastTenSensorTensao = lastTenRecords.map((record) => record.sensort);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>SolarPlate Monitoring</Text>
      </View>

      <View style={styles.sectionContainer}>
        <LineChartComponent
          yAxisLabel={''}
          yAxisSuffix={'º'}
          chartTitle={'Servo Vertical'}
          data={lastTenServoVertical}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Angle of the Plate: 40°</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <LineChartComponent
          yAxisLabel={''}
          yAxisSuffix={'V'}
          chartTitle={'Sensor Tensão'}
          data={lastTenSensorTensao}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Voltage Sensor</Text>
        </View>
      </View>

      <ToggleSwitch />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 3,
  },
  infoContainer: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  infoText: {
    color: '#333',
  },
});
