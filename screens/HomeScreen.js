import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Modal, Image, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';

const categories = [
  { id: '1', name: 'Refeição' },
  { id: '2', name: 'Bebidas' },
  { id: '3', name: 'Sobremesas' },
  { id: '4', name: 'Saladas' },
  { id: '5', name: 'Massas' },
  { id: '6', name: 'Pizza' },
  { id: '7', name: 'Hambúrguer' },
  { id: '8', name: 'Churrasco' },
];

const restaurants = [
  { id: '1', name: 'Restaurante A', address: 'Rua A, 123', rating: 4.5, menuItem: 'Pizza de Calabresa', position: { top: 50, left: 80 } },
  { id: '2', name: 'Restaurante B', address: 'Rua B, 456', rating: 4.0, menuItem: 'Hambúrguer Artesanal', position: { top: 100, left: 150 } },
  { id: '3', name: 'Restaurante C', address: 'Rua C, 789', rating: 4.7, menuItem: 'Macarrão à Bolonhesa', position: { top: 200, left: 50 } },
  { id: '4', name: 'Restaurante D', address: 'Rua D, 101', rating: 4.2, menuItem: 'Churrasco Misto', position: { top: 120, left: 250 } },
  { id: '5', name: 'Restaurante E', address: 'Rua E, 112', rating: 4.8, menuItem: 'Frango à Parmegiana', position: { top: 70, left: 250 } },
  { id: '6', name: 'Restaurante F', address: 'Rua F, 135', rating: 4.1, menuItem: 'Salada Caesar', position: { top: 220, left: 180 } },
  { id: '7', name: 'Restaurante G', address: 'Rua G, 246', rating: 4.3, menuItem: 'Torta de Limão', position: { top: 180, left: 280 } },
  { id: '8', name: 'Restaurante H', address: 'Rua H, 357', rating: 4.6, menuItem: 'Suco Natural', position: { top: 30, left: 200 } },
  { id: '9', name: 'Restaurante I', address: 'Rua I, 468', rating: 4.4, menuItem: 'Sopa de Legumes', position: { top: 250, left: 100 } },
  { id: '10', name: 'Restaurante J', address: 'Rua J, 579', rating: 4.9, menuItem: 'Picanha na Brasa', position: { top: 150, left: 220 } },
];

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('Produtos', { category: item.name })}
    >
      <Text style={[styles.text, { color: colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const openRestaurantDetails = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalVisible(true);
  };

  const renderRestaurantMarker = (restaurant) => (
    <TouchableOpacity
      key={restaurant.id}
      style={[styles.marker, restaurant.position]}
      onPress={() => openRestaurantDetails(restaurant)}
    >
      <Text style={styles.markerText}>{restaurant.name[12]}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Bem-vindo ao InfnetFood!</Text>

        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />

        <Text style={[styles.title, { color: colors.text }]}>Mapa de Restaurantes</Text>

        <View style={styles.mapContainer}>
          <Image
            source={require('../assets/mapa_rio.png')}
            style={styles.map}
          />
          <View style={styles.markersContainer}>
            {restaurants.map((restaurant) => renderRestaurantMarker(restaurant))}
          </View>
        </View>

        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            {selectedRestaurant && (
              <>
                <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>
                <Text style={styles.modalText}>Endereço: {selectedRestaurant.address}</Text>
                <Text style={styles.modalText}>Avaliação: {selectedRestaurant.rating} ⭐</Text>
                <Text style={styles.modalText}>Carro Chefe: {selectedRestaurant.menuItem}</Text>
                <Pressable
                  style={[styles.closeButton, { backgroundColor: '#BB86FC' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </Pressable>
              </>
            )}
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  item: {
    width: '48%',
    margin: '1%',
    padding: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  gridContainer: {
    marginBottom: 16,
  },
  mapContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    marginTop: 16,
    marginBottom: 16,
  },
  map: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  markersContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: '#BB86FC',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
