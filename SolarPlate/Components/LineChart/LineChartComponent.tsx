import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet } from 'react-native';

interface LineChartProps {
  yAxisLabel: string;
  yAxisSuffix: string;
  chartTitle: string;
  data: number[]; // Adicionado propriedade para os dados do gráfico
}

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`, // Cor principal do gráfico
  strokeWidth: 2,
  decimalPlaces: 0,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#3f51b5', // Cor dos pontos no gráfico
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

const LineChartComponent: React.FC<LineChartProps> = ({ yAxisLabel, yAxisSuffix, chartTitle, data }) => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    const interval = setInterval(() => {
      // Não alterar os dados aleatoriamente aqui
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentDate = new Date();
  const hours = Array.from({ length: 8 }, (_, index) => {
    const newDate = new Date(currentDate.getTime() - index * 60 * 60 * 1000);
    return `${newDate.getHours()}:${newDate.getMinutes()}`;
  });

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{chartTitle}</Text>
      <LineChart
        data={{
          labels: hours,
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={380}
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3f51b5', // Cor do título do gráfico
  },
  chart: {
    marginTop: 10,
  },
});

export default LineChartComponent;
