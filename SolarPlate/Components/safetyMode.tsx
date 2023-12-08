import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';

function SafetyMode() {
  const [safetyModeAtivado, setSafetyModeAtivado] = useState(false);

  const showSafetyModeAlert = () => {
    Alert.alert(
      'Ativar SafetyMode',
      'Deseja ativar o SafetyMode?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            window.alert('SafetyMode ativado!');
            setSafetyModeAtivado(true);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const showDesativarSafetyModeAlert = () => {
    Alert.alert(
      'Desativar SafetyMode',
      'Deseja desativar o SafetyMode?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            window.alert('SafetyMode desativado!');
            setSafetyModeAtivado(false);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={safetyModeAtivado ? showDesativarSafetyModeAlert : showSafetyModeAlert}>
        <Image
          source={safetyModeAtivado ? require('../assets/ponto_exclamacao_Vermelho.png') : require('../assets/ponto_exclamacao_Azul.png')}
          style={styles.imagem}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:"flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    width: 60,
    height: 60,
  },
});

export default SafetyMode;
