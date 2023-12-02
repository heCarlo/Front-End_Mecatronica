import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import LineChartComponent from './Components/LineChart/LineChartComponent';
import ToggleSwitch from './Components/ToggleSwitch/toggleSwitch';
import mockData from './Mock/mockData.json';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Record {
  created_at: string;
  value: number;
  sensort: number;
  servo_vertical: number;
  secury_mode: boolean;
}

const getLastTenRecords = (data: Record[]) => data.slice(0, 10);

export default function App() {
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
          chartStyle={styles.chartStyle}
          titleStyle={styles.chartTitleStyle}
        />
      </View>

      <View style={[styles.sectionContainer, styles.chartMargin]}>
        <LineChartComponent
          yAxisLabel={''}
          yAxisSuffix={'V'}
          chartTitle={'Sensor Tensão'}
          data={lastTenSensorTensao}
          chartStyle={styles.chartStyle}
          titleStyle={styles.chartTitleStyle}
        />
      </View>

      <ToggleSwitch />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
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
  chartMargin: {
    marginBottom: 10,
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
  chartStyle: {
    backgroundColor: 'lightblue',
    maxWidth: windowWidth - 32,
    maxHeight: windowHeight - 32,
  },
  chartTitleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3f51b5',
  },
});
