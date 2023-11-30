import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SwitchToggle from 'react-native-switch-toggle';

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const onToggle = () => {
    setIsOn(!isOn);
    // Adicione aqui a lógica que você deseja executar quando o botão for alternado
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{isOn ? 'Ligado' : 'Desligado'}</Text>
      <SwitchToggle
        containerStyle={{
          marginTop: 16,
          width: 250,
          height: 55,
          borderRadius: 25,
          backgroundColor: "gray",
          padding: 5,
        }}
        circleStyle={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: 'white', // cor do círculo deslizante
        }}
        switchOn={isOn}
        onPress={onToggle}
        circleColorOff="white"
        circleColorOn="white"
        duration={500}
      />
    </View>
  );
};

export default ToggleSwitch;
