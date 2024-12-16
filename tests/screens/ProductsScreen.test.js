import { render, fireEvent } from '@testing-library/react-native';
import ProductsScreen from '../../screens/ProductsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const wrapper = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Produtos" component={ProductsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('ProductsScreen', () => {
  it('deve exibir a lista de produtos para a categoria selecionada', () => {
    const route = { params: { category: 'Lanches' } };

    const { getByText } = render(wrapper(<ProductsScreen route={route} />));

    expect(getByText('Hambúrguer')).toBeTruthy();
    expect(getByText('Sanduíche')).toBeTruthy();
  });

  it('deve adicionar o produto ao carrinho quando pressionado', () => {
    const route = { params: { category: 'Lanches' } };
    const addToCart = jest.fn();

    const { getByText } = render(wrapper(<ProductsScreen route={route} addToCart={addToCart} />));

    fireEvent.press(getByText('Adicionar ao Carrinho'));

    expect(addToCart).toHaveBeenCalled();
  });
});
