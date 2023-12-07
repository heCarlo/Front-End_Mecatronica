import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";
import React from "react";

function Grafico() {
  const [backgroundColor, setBackgroundColor] = useState("#BCE4FD");
  const [textColor, setTextColor] = useState("black"); // Adicionando o estado para a cor do texto
  // const hora = new Date().getHours();
  const [imageSource, setImageSource] = useState(require("../assets/sol.png"));

 // Para testes manuais
  const rotationAngle = 0; // Ângulo de rotação desejado
  const Angulo = rotationAngle + 90 + "°";

  useEffect(() => {
    const isNoite = hora < 6 || hora >= 18;
    setBackgroundColor(isNoite ? "black" : "#BCE4FD");
    setTextColor(isNoite ? "white" : "black");
    if (isNoite) {
      setImageSource(require("../assets/lua-crescente.png"));
    } else {
      setImageSource(require("../assets/sol.png"));
    }

  }, [hora]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image source={imageSource} style={[styles.imagem]} />
      
      <Image
        source={require("../assets/painel-solar_2.png")}
        style={[
          styles.placaSolar,
          { transform: [{ rotate: `${rotationAngle}deg` }] },
        ]}
      />
      <Text style={[styles.angulo, { color: textColor }]}>{Angulo}</Text>
      <Text>{hora}</Text>
    </View>
  );
}

const { width } = Dimensions.get("window");
const larguraPlaca = 80;
const hora = new Date().getHours();
// let hora = 18; // Para testes manuais
const Sol = 80;

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: width,
  },
  imagem: {
    position:"absolute",
    marginTop: 15,
    width: Sol, // Ajuste de acordo com a largura desejada
    height: Sol, // Ajuste de acordo com a altura desejada

    //left: (((width/12)*(hora-6))-(Sol/1.5))
    left: hora >= 6 && hora <18 ? (((width/12)*(hora-6)-(Sol/1.5))):
    hora <=24 && hora >=18?(((width/12)*(hora-18)-(Sol/1.5))):(((width/12)*(hora+6)-(Sol/1.5)))
  },
  placaSolar: {
    width: larguraPlaca, // Ajuste de acordo com a largura desejada
    height: 30, // Ajuste de acordo com a altura desejada
    position: "absolute",
    bottom: 40,
    left: (width - larguraPlaca) / 2,
  },
  angulo: {
    fontSize: 30,
    position: "absolute",
    bottom: 20,
    left: width / 2 + larguraPlaca / 2,
  },
});

export default Grafico;
