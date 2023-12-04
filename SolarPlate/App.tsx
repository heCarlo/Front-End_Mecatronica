import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
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

const getLastTenRecords = (data: Record[]) => data.slice(0, 7);

export default function App() {
  const [showServoVertical, setShowServoVertical] = useState(true);
  const [data, setData] = useState(getLastTenRecords(mockData));
  const [chartComponentKey, setChartComponentKey] = useState(1);

  const chartTitle = showServoVertical ? 'Servo Vertical' : 'Sensor Tensão';

  const chartData = data.map((record) =>
    showServoVertical ? record.servo_vertical : record.sensort
  );

  // Adicione uma propriedade x para o eixo x (tempo, por exemplo)
  const chartXData = data.map((record) => record.created_at);

  const toggleChart = () => {
    setShowServoVertical(!showServoVertical);
    fetchDataFromJson();
  };

  const fetchDataFromJson = () => {
    const newData = getLastTenRecords(mockData);
    setData(newData);
    setChartComponentKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    setChartComponentKey((prevKey) => prevKey + 1);
  }, [data]);

  const checkForMockDataUpdate = () => {
    const mockDataString = JSON.stringify(mockData);
    const dataString = JSON.stringify(data);

    if (mockDataString !== dataString) {
      fetchDataFromJson();
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkForMockDataUpdate, 500);

    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>SolarPlate Monitoring</Text>
      </View>

      <View style={[styles.sectionContainer, styles.chartMargin]}>
        <LineChartComponent
          key={chartComponentKey}
          yAxisLabel={''}
          yAxisSuffix={showServoVertical ? 'º' : 'V'}
          chartTitle={chartTitle}
          data={chartData}
          chartXData={chartXData} // Adicione a propriedade para o eixo x
          chartStyle={styles.chartStyle}
          titleStyle={styles.chartTitleStyle}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleChart}>
          <Text style={styles.toggleButtonText}>
            {showServoVertical ? 'Sensor de Tensão' : 'Servo Vertical'}
          </Text>
        </TouchableOpacity>
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
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  toggleButton: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3f51b5',
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
