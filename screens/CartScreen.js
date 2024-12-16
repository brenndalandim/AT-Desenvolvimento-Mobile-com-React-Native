import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CartScreen({ cart, removeFromCart, navigation }) {
  const { colors } = useTheme();
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: colors.card }]}>
      <View style={styles.itemDetails}>
        <Text style={[styles.text, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.quantity, { color: colors.text }]}>
          x{item.quantity}
        </Text>
      </View>
      <Text style={[styles.price, { color: colors.text }]}>
        R${item.price.toFixed(2)}
      </Text>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <MaterialCommunityIcons name="trash-can" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Erro','Seu carrinho está vazio! Adicione produtos para finalizar.');
    } else {
      navigation.navigate('Checkout', { cart });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Resumo do Pedido</Text>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Text style={[styles.total, { color: colors.text }]}>
        Total: R${totalPrice.toFixed(2)}
      </Text>
      <TouchableOpacity
        style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
        onPress={handleCheckout}
      >
        <Text style={[styles.checkoutButtonText, { color: colors.background }]}>
          Finalizar Pedido
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
    textAlign: 'center'
  },
  item: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
  },
  quantity: {
    fontSize: 14,
    marginLeft: 8,
  },
  price: {
    fontSize: 14,
    marginTop: 4,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  checkoutButton: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  checkoutButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});