import React from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import Grafico from "../Components/grafico";
import SafetyMode from "../Components/safetyMode";
import Botao from "../Components/Button";

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Grafico />
      <Button title="teste" onPress={() => navigation.navigate("pageSafetyMode")} />
      <View style={styles.btns2}>
        <SafetyMode/>
        <Botao title="Mais Informações" onPress={() => navigation.navigate("Sobre")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btns2: {
    
    flexDirection: 'row', // Para alinhar a imagem e o botão na horizontal
    alignItems:"center",
    justifyContent:"center",
    width:width,
    padding:30,
    
  },
  imagem: {
    width: 80, // Ajuste de acordo com a largura desejada
    height: 80, // Ajuste de acordo com a altura desejada
  },
  
});

export default HomeScreen;
