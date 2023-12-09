import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

interface GraficoProps {
  servo_vertical: number;
}

function Grafico({ servo_vertical }: GraficoProps) {
  const [backgroundColor, setBackgroundColor] = useState("lightblue");
  const [textColor, setTextColor] = useState("black");
  const [imageSource, setImageSource] = useState(require("../assets/sol.png"));

  const hora = new Date().getHours();
  const rotationAngle = servo_vertical;

  useEffect(() => {
    const isNoite = hora < 6 || hora >= 18;
    setBackgroundColor(isNoite ? "darkblue" : "lightblue");
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
      <Text style={[styles.angulo, { color: textColor }]}>{servo_vertical}º</Text>
    </View>
  );
}

const { width: larguraDaTela } = Dimensions.get("window");
const larguraPlaca = 80;
const hora = new Date().getHours();

const styles = StyleSheet.create({
  container: {
    height: larguraDaTela - larguraDaTela / 2.8,
    width: larguraDaTela,
  },
  imagem: {
    position: "absolute",
    marginTop: 15,
    width: 80, // Ajuste de acordo com a largura desejada
    height: 80, // Ajuste de acordo com a altura desejada
    left:
      hora >= 6 && hora < 18
        ? larguraDaTela / 12 * (hora - 6) - 80 / 3
        : hora <= 24 && hora >= 18
        ? larguraDaTela / 12 * (hora - 18) - 80 / 3
        : larguraDaTela / 12 * (hora + 6) - 80 / 3,
  },
  placaSolar: {
    width: larguraPlaca,
    height: 30,
    position: "absolute",
    bottom: 40,
    left: (larguraDaTela - larguraPlaca) / 2,
  },
  angulo: {
    fontSize: 30,
    position: "absolute",
    bottom: 20,
    left: larguraDaTela / 2 + larguraPlaca / 2,
  },
});

export default Grafico;
