import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function CheckoutScreen({ cart, addOrderToHistory, navigation }) {
  const { colors } = useTheme();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const paymentMethods = ['Cartão de Crédito', 'Pix', 'Boleto'];

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleConfirmOrder = () => {
    if (!address.trim()) {
      Alert.alert('Erro', 'O endereço de entrega é obrigatório!');
      return;
    }

    if (!paymentMethod) {
      Alert.alert('Erro', 'Selecione um método de pagamento!');
      return;
    }

    const orderData = {
      id: new Date().getTime(),
      items: cart,
      address,
      paymentMethod,
      total: totalPrice,
    };

    addOrderToHistory(orderData);
    Alert.alert('Sucesso', 'Pedido realizado com sucesso!');
    setTimeout(() => {
      navigation.navigate('Home');
    }, 100);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Resumo do Pedido</Text>

      <View style={[styles.cartContainer, { backgroundColor: colors.card }]}>
        {cart.map((item, index) => (
          <Text key={index} style={[styles.cartItem, { color: colors.text }]}>
            {item.name} - R${item.price.toFixed(2)} x {item.quantity}
          </Text>
        ))}
      </View>

      <Text style={[styles.total, { color: colors.text }]}>
        Total: R${totalPrice.toFixed(2)}
      </Text>

      <Text style={[styles.label, { color: colors.text }]}>Endereço de Entrega:</Text>
      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        placeholder="Digite o endereço"
        placeholderTextColor={colors.placeholder}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={[styles.label, { color: colors.text }]}>Método de Pagamento:</Text>
      {paymentMethods.map((method, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.paymentButton,
            { borderColor: colors.border, backgroundColor: paymentMethod === method ? colors.primary : colors.card },
          ]}
          onPress={() => setPaymentMethod(method)}
        >
          <Text
            style={[
              styles.paymentButtonText,
              { color: paymentMethod === method ? colors.background : colors.text },
            ]}
          >
            {method}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.confirmButton, { backgroundColor: colors.primary }]}
        onPress={handleConfirmOrder}
      >
        <Text style={[styles.confirmButtonText, { color: colors.background }]}>
          Confirmar Pedido
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  cartContainer: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
  },
  cartItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  paymentButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 16,
  },
  confirmButton: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  confirmButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
