import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const onToggle = () => {
    setIsOn(!isOn);
    // Adicione aqui a lógica que você deseja executar quando o botão for alternado
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{isOn ? 'Ligado' : 'Desligado'}</Text>
      <SwitchToggle
        containerStyle={styles.switchContainer}
        circleStyle={styles.circleStyle}
        switchOn={isOn}
        onPress={onToggle}
        circleColorOff="#e4e5e5"
        circleColorOn="#fff"
        backgroundColorOn="#3f51b5"
        backgroundColorOff="#aaa"
        duration={500}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    marginTop: 16,
    width: 250,
    height: 55,
    borderRadius: 25,
    backgroundColor: '#aaa', // Cor de fundo quando desligado
    padding: 5,
  },
  circleStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3f51b5', // Cor do círculo deslizante quando ligado
  },
  statusText: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ToggleSwitch;
