import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

const SafetyIndicator = ({ active }: { active: boolean }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Atualiza a visibilidade a cada 500ms (pode ser ajustado conforme necessário)
    const intervalId = setInterval(() => {
      setVisible((prevVisible) => !prevVisible);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  if (!active) {
    return null; // Se o modo de segurança não estiver ativo, não renderiza nada
  }

  return (
    <View
      style={[
        styles.indicator,
        { backgroundColor: visible ? "red" : "transparent" },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    marginLeft: 10,
    display: "flex",
    flexDirection: "row"

  },
});

export default SafetyIndicator;
