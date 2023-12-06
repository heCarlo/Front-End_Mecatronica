import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default function pageSafetyMode() {
  return (
    <View>
      <Text>SafetyMode</Text>
      
      
    </View>
    
  );
}
// const styles = StyleSheet.create({
//   btns2: {
    
//     flexDirection: 'row', // Para alinhar a imagem e o botão na horizontal
//     alignItems:"center",
//     justifyContent:"center",
//     width:width,
//     padding:30,
    
//   },
//   imagem: {
//     width: 80, // Ajuste de acordo com a largura desejada
//     height: 80, // Ajuste de acordo com a altura desejada
//   },
  
// });

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = () => {
    // Lógica a ser executada ao confirmar
    console.log('Usuário clicou em "Yes"');
    closeModal();
  };

  return (
    <View>
      <Button title="Abrir Pop-up" onPress={openModal} />
      <ConfirmationModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onConfirm={handleConfirm}
        message="Deseja confirmar a ação?"
      />
    </View>
  );
};