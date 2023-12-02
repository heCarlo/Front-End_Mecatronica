import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface LineChartProps {
  yAxisLabel: string;
  yAxisSuffix: string;
  chartTitle: string;
  data: number[];
  chartStyle?: StyleProp<ViewStyle>; // Nova propriedade para o estilo do gráfico
  titleStyle?: StyleProp<TextStyle>; // Nova propriedade para o estilo do título
}

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(63, 81, 181, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 0,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#3f51b5',
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

const LineChartComponent: React.FC<LineChartProps> = ({ yAxisLabel, yAxisSuffix, chartTitle, data, chartStyle, titleStyle }) => {
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

  const convertedStyle = StyleSheet.flatten(chartStyle as StyleProp<ViewStyle>);
  const convertedTitleStyle = StyleSheet.flatten(titleStyle as StyleProp<TextStyle>);

  return (
    <View style={[styles.chartContainer, convertedStyle]}>
      <Text style={[styles.chartTitle, convertedTitleStyle]}>{chartTitle}</Text>
      <LineChart
        data={{
          labels: hours,
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={347}
        height={180}
        yAxisLabel={yAxisLabel}
        yAxisSuffix={yAxisSuffix}
        chartConfig={chartConfig}
        style={convertedStyle}
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
    color: '#3f51b5',
  },
});

export default LineChartComponent;
