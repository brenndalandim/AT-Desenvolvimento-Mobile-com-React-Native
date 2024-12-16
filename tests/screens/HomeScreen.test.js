import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const wrapper = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('HomeScreen', () => {
  it('deve exibir a lista de categorias corretamente', () => {
    const { getByText } = render(wrapper());

    expect(getByText('Lanches')).toBeTruthy();
    expect(getByText('Bebidas')).toBeTruthy();
    expect(getByText('Sobremesas')).toBeTruthy();
  });

  it('deve navegar para a tela de Produtos ao clicar em uma categoria', () => {
    const { getByText } = render(wrapper());

    fireEvent.press(getByText('Lanches'));

    expect(getByText('Produtos de Lanches')).toBeTruthy();
  });
});