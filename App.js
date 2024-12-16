import React, { useState } from 'react';
import { NavigationContainer, useTheme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import CheckoutScreen from './screens/CheckoutScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === id);
      if (existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return prevCart.filter((cartItem) => cartItem.id !== id);
      }
    });
  };

  const addOrderToHistory = (order) => {
    setOrderHistory((prevHistory) => [...prevHistory, order]);
    setCart([]);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#000000',
    primary: '#BB86FC',
    card: '#f8f9fa',
    border: '#e0e0e0',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#1b1717',
    text: '#ffffff',
    primary: '#BB86FC',
    card: '#1f1f1f',
    border: '#272727',
  },
};

  const theme = isDarkMode ? CustomDarkTheme : LightTheme;

  function MainTabs({ toggleTheme, isDarkMode }) {

    const { colors } = useTheme();

    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text,
          tabBarStyle: { backgroundColor: colors.background },
        }}
      >
        <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Carrinho"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        >
          {({ navigation }) => (
          <CartScreen
            cart={cart}
            removeFromCart={removeFromCart}
            navigation={navigation}
          />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Pedidos"
          component={(props) => <OrdersScreen {...props} orderHistory={orderHistory} />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="clipboard-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          children={({ navigation }) => {
            return <ProfileScreen user={user} navigation={navigation} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />;
          }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen {...props} setUser={setUser} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {({ route }) => {
            return (
              <MainTabs
                route={route}
                toggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
              />
            );
          }}
        </Stack.Screen>
        <Stack.Screen name="Produtos">
          {({ route, navigation }) => (
            <ProductsScreen
              route={route}
              navigation={navigation}
              addToCart={addToCart}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Checkout">
          {({ route, navigation }) => {
            const cart = route.params?.cart;
            return <CheckoutScreen cart={cart} navigation={navigation} addOrderToHistory={addOrderToHistory} />;
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}