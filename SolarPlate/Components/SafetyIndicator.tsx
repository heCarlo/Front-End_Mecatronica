import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

// Component representing a Safety Indicator
const SafetyIndicator = ({ active }: { active: boolean }) => {
  // State to manage visibility of the indicator
  const [visible, setVisible] = useState(true);

  // Effect to toggle visibility every 500ms (adjustable as needed)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisible((prevVisible) => !prevVisible);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  // If the safety mode is inactive, return null (don't render anything)
  if (!active) {
    return null;
  }

  // Render the Safety Indicator view
  return (
    <View
      style={[
        styles.indicator,
        { backgroundColor: visible ? "red" : "transparent" },
      ]}
    />
  );
};

// Styles for the SafetyIndicator component
const styles = StyleSheet.create({
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "red",
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
  },
});

export default SafetyIndicator;
