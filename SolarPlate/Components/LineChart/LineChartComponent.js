// LineChartComponent.js
import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet } from 'react-native';

const generateRandomData = () => {
  return Array.from({ length: 30 }, (_, index) => Math.floor(Math.random() * 100) + 1); // 30 pontos de dados
};

const getFormattedHour = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 0,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
  propsForVerticalLabels: {
    fontSize: 10,
  },
  propsForHorizontalLabels: {
    fontSize: 10,
  },
  propsForBackgroundLines: {
    strokeDasharray: '',
  },
};

const LineChartComponent = ({ yAxisLabel, yAxisSuffix, chartTitle }) => {
  const [data, setData] = useState(generateRandomData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(-9), Math.floor(Math.random() * 100) + 1]; // Manter apenas os 10 mais recentes
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentDate = new Date();
  const hours = Array.from({ length: 8 }, (_, index) => getFormattedHour(new Date(currentDate - index * 60 * 60 * 1000)));

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{chartTitle}</Text>
      <LineChart
        data={{
          labels: hours,
          datasets: [
            {
              data,
            },
          ],
        }}
        width={400}
        height={200}
        yAxisLabel={yAxisLabel}
        yAxisSuffix={yAxisSuffix}
        chartConfig={chartConfig}
        style={styles.chart}
        withVerticalLines={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginTop: 10,
  },
});

export default LineChartComponent;
