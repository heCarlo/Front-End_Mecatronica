import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

// Props interface for the Grafico component
interface GraficoProps {
  servo_vertical: number;
}

// Grafico component displaying solar panel angle and sun/moon image based on time
function Grafico({ servo_vertical }: GraficoProps) {
  // State to manage background color, text color, and image source
  const [backgroundColor, setBackgroundColor] = useState("lightblue");
  const [textColor, setTextColor] = useState("black");
  const [imageSource, setImageSource] = useState(require("../assets/sol.png"));

  // Get current hour
  const hora = new Date().getHours();
  // Get servo_vertical (solar panel angle) from props
  const rotationAngle = servo_vertical;

  // Effect to set background, text color, and image based on the time
  useEffect(() => {
    // Determine if it's nighttime (between 6pm and 6am)
    const isNoite = hora < 6 || hora >= 18;
    setBackgroundColor(isNoite ? "darkblue" : "lightblue");
    setTextColor(isNoite ? "white" : "black");
    // Set image source based on day or night
    if (isNoite) {
      setImageSource(require("../assets/lua-crescente.png"));
    } else {
      setImageSource(require("../assets/sol.png"));
    }
  }, [hora]);

  // Return the component's view
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

// Dimensions of the screen
const { width: larguraDaTela } = Dimensions.get("window");
const larguraPlaca = 80; // Width of solar panel
const hora = new Date().getHours();

// Styles for the Grafico component
const styles = StyleSheet.create({
  container: {
    height: larguraDaTela - larguraDaTela / 2.8,
    width: larguraDaTela,
  },
  imagem: {
    position: "absolute",
    marginTop: 15,
    width: 80, // Adjust as needed for width
    height: 80, // Adjust as needed for height
    // Positioning based on time of day
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
