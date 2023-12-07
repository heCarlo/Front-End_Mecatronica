import { StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

function SafetyMode() {
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
            // Adicione a lógica aqui para o caso 'Sim'
            console.log('SafetyMode ativado!');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showSafetyModeAlert}>
        <Image
          source={require('../assets/ponto_exclamacao_Azul.png')}
          style={styles.imagem}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    width: 70, // Ajuste de acordo com a largura desejada
    height: 70, // Ajuste de acordo com a altura desejada
  },
  
});

export default SafetyMode;