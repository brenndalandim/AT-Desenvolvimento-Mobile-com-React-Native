import { useRef } from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const products = {
  Refeição: [
    { id: '1', name: 'Arroz com Feijão', price: 12.0 },
    { id: '2', name: 'Bife à Parmegiana', price: 20.0 },
    { id: '3', name: 'Frango Grelhado', price: 18.0 },
    { id: '4', name: 'Peixe Assado', price: 22.0 },
    { id: '5', name: 'Feijoada', price: 25.0 },
    { id: '6', name: 'Estrogonofe de Frango', price: 18.0 },
    { id: '7', name: 'Carne de Panela', price: 20.0 },
    { id: '8', name: 'Lasanha', price: 30.0 },
    { id: '9', name: 'Moqueca', price: 35.0 },
    { id: '10', name: 'Tutu de Feijão', price: 15.0 },
  ],
  Bebidas: [
    { id: '1', name: 'Refrigerante', price: 5.0 },
    { id: '2', name: 'Suco de Laranja', price: 6.0 },
    { id: '3', name: 'Suco de Abacaxi', price: 6.5 },
    { id: '4', name: 'Água', price: 2.0 },
    { id: '5', name: 'Cerveja', price: 7.0 },
    { id: '6', name: 'Refrigerante Diet', price: 5.5 },
    { id: '7', name: 'Suco de Morango', price: 6.0 },
    { id: '8', name: 'Suco de Uva', price: 6.5 },
    { id: '9', name: 'Chá Gelado', price: 5.0 },
    { id: '10', name: 'Água de Coco', price: 4.0 },
  ],
  Sobremesas: [
    { id: '1', name: 'Pudim', price: 7.0 },
    { id: '2', name: 'Sorvete', price: 8.0 },
    { id: '3', name: 'Bolo de Chocolate', price: 10.0 },
    { id: '4', name: 'Torta de Limão', price: 9.0 },
    { id: '5', name: 'Brigadeiro', price: 5.0 },
    { id: '6', name: 'Mousse de Maracujá', price: 7.5 },
    { id: '7', name: 'Pavê', price: 12.0 },
    { id: '8', name: 'Cheesecake', price: 15.0 },
    { id: '9', name: 'Cocada', price: 6.0 },
    { id: '10', name: 'Banana Caramelada', price: 8.0 },
  ],
  Saladas: [
    { id: '1', name: 'Salada Caesar', price: 10.0 },
    { id: '2', name: 'Salada de Atum', price: 12.0 },
    { id: '3', name: 'Salada de Frango', price: 11.0 },
    { id: '4', name: 'Salada de Quinoa', price: 15.0 },
    { id: '5', name: 'Salada Caprese', price: 14.0 },
    { id: '6', name: 'Salada Mediterrânea', price: 13.0 },
    { id: '7', name: 'Salada de Maionese', price: 8.0 },
    { id: '8', name: 'Salada Tropical', price: 12.0 },
    { id: '9', name: 'Salada de Batata', price: 7.0 },
    { id: '10', name: 'Salada de Grãos', price: 9.0 },
  ],
  Massas: [
    { id: '1', name: 'Espaguete à Bolonhesa', price: 18.0 },
    { id: '2', name: 'Lasanha à Bolonhesa', price: 22.0 },
    { id: '3', name: 'Fettucine Alfredo', price: 20.0 },
    { id: '4', name: 'Macarrão com Molho Pesto', price: 16.0 },
    { id: '5', name: 'Ravioli', price: 24.0 },
    { id: '6', name: 'Macarrão Carbonara', price: 19.0 },
    { id: '7', name: 'Penne à Arrabbiata', price: 17.0 },
    { id: '8', name: 'Lasagna de Vegetais', price: 21.0 },
    { id: '9', name: 'Macarrão à Primavera', price: 18.0 },
    { id: '10', name: 'Nhoque de Batata', price: 20.0 },
  ],
  Pizza: [
    { id: '1', name: 'Pizza Margherita', price: 25.0 },
    { id: '2', name: 'Pizza Calabresa', price: 28.0 },
    { id: '3', name: 'Pizza Portuguesa', price: 30.0 },
    { id: '4', name: 'Pizza de Frango com Catupiry', price: 32.0 },
    { id: '5', name: 'Pizza de Quatro Queijos', price: 35.0 },
    { id: '6', name: 'Pizza de Pepperoni', price: 33.0 },
    { id: '7', name: 'Pizza de Atum', price: 28.0 },
    { id: '8', name: 'Pizza Vegana', price: 30.0 },
    { id: '9', name: 'Pizza de Frango com Bacon', price: 34.0 },
    { id: '10', name: 'Pizza de Bacon', price: 30.0 },
  ],
  Hambúrguer: [
    { id: '1', name: 'Hamburguer de Carne', price: 15.0 },
    { id: '2', name: 'Hamburguer de Frango', price: 17.0 },
    { id: '3', name: 'Hamburguer Vegano', price: 18.0 },
    { id: '4', name: 'Cheeseburguer', price: 20.0 },
    { id: '5', name: 'Hamburguer com Bacon', price: 22.0 },
    { id: '6', name: 'Hamburguer de Peixe', price: 19.0 },
    { id: '7', name: 'Hamburguer de Costela', price: 25.0 },
    { id: '8', name: 'Hamburguer de Porco', price: 21.0 },
    { id: '9', name: 'Hamburguer de Ovo', price: 16.0 },
    { id: '10', name: 'Cheeseburguer com Ovos', price: 22.0 },
  ],
  Churrasco: [
    { id: '1', name: 'Picanha', price: 40.0 },
    { id: '2', name: 'Fraldinha', price: 35.0 },
    { id: '3', name: 'Alcatra', price: 30.0 },
    { id: '4', name: 'Costela', price: 50.0 },
    { id: '5', name: 'Linguiça', price: 18.0 },
    { id: '6', name: 'Frango Assado', price: 25.0 },
    { id: '7', name: 'Espetinho de Carne', price: 15.0 },
    { id: '8', name: 'Espetinho de Frango', price: 12.0 },
    { id: '9', name: 'Coração de Frango', price: 10.0 },
    { id: '10', name: 'Maminha', price: 45.0 },
  ],
};

export default function ProductsScreen({ route, addToCart }) {
  const { category } = route.params;
  const productList = products[category] || [];
  const { colors } = useTheme();

  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePress = (item) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    addToCart(item);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { backgroundColor: colors.card }]}>
      <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
      
      <Text style={[styles.itemPrice, { color: colors.text }]}>R${item.price.toFixed(2)}</Text>
      
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => handlePress(item)}>
        <Text style={styles.buttonText}>
          <FontAwesome name="cart-plus" size={20} color="white" style={styles.icon} />
          Carrinho
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Categoria - {category}</Text>
      <FlatList
        data={productList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    flex: 1,
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    padding: 8,
    borderRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  flatListContainer: {
    paddingBottom: 16,
  },
});