import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

function SafetyMode() {
    const navigation = useNavigation();
  return (
    
    <View style={styles.container} >
        <TouchableOpacity onPress={() => navigation.navigate('Sobre')}>
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