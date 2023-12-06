import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface BotaoProps extends TouchableOpacityProps {
  title: string;
}

const Botao: React.FC<BotaoProps> = ({ title, ...props }) => {
  return (
    <TouchableOpacity style={styles.Botao} {...props}>
      <Text style={styles.BotaoText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Botao: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent:'center',
    height:50,
    width:250,
    
  },
  BotaoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



export default Botao;