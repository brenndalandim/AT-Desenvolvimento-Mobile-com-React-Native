import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function OrdersScreen({ orderHistory }) {
  const { colors } = useTheme();
  const [orders, setOrders] = useState(orderHistory);

  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permissão para notificações não concedida!');
    }
  };

  const sendLocalNotification = async (message) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Status do Pedido',
          body: message,
          sound: true,
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  };

  const simulateOrderStatusChange = () => {
    const statusSteps = [
      'Pedido Feito',
      'Restaurante recebeu seu pedido',
      'Em Andamento',
      'Pedido saiu para entrega',
      'Pedido Concluído',
    ];

    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (!order.status || order.status !== 'Pedido Concluído') {
          let currentStatusIndex = statusSteps.indexOf(order.status);
          currentStatusIndex = currentStatusIndex < 0 ? 0 : currentStatusIndex + 1;

          const updatedOrder = {
            ...order,
            status: statusSteps[currentStatusIndex],
          };

          if (
            updatedOrder.status === 'Restaurante recebeu seu pedido' ||
            updatedOrder.status === 'Pedido saiu para entrega'
          ) {
            sendLocalNotification(`O status do seu pedido foi atualizado para: ${updatedOrder.status}`);
          }

          return updatedOrder;
        }
        return order;
      })
    );
  };

  useEffect(() => {
    requestNotificationPermissions();

    if (orderHistory && orderHistory.length > 0) {
      const intervalId = setInterval(simulateOrderStatusChange, 2000);
      return () => clearInterval(intervalId);
    }
  }, [orderHistory]);

  const renderOrder = ({ item, index }) => (
    <View style={[styles.order, { backgroundColor: colors.card }]}>
      <Text style={[styles.orderTitle, { color: colors.text }]}>Pedido {index + 1}</Text>
      {item.items.map((product, i) => (
        <Text key={i} style={[styles.product, { color: colors.text }]}>
          {product.name} - R${product.price.toFixed(2)} x {product.quantity}
        </Text>
      ))}
      <Text style={[styles.total, { color: colors.text }]}>
        Total: R${item.total.toFixed(2)}
      </Text>
      <Text style={[styles.details, { color: colors.text }]}>Endereço: {item.address}</Text>
      <Text style={[styles.details, { color: colors.text }]}>Pagamento: {item.paymentMethod}</Text>
      <Text style={[styles.status, { color: colors.text }]}>
        Status: {item.status || 'Aguardando...'}
      </Text>
    </View>
  );

  if (!orders || orders.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Histórico de Pedidos</Text>
        <Text style={[styles.noOrders, { color: colors.text }]}>Nenhum pedido realizado ainda.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Histórico de Pedidos</Text>
      <FlatList data={orders} renderItem={renderOrder} keyExtractor={(item) => item.id.toString()} />
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
  order: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  product: {
    fontSize: 16,
    marginBottom: 4,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  details: {
    fontSize: 14,
    marginTop: 4,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  noOrders: {
    fontSize: 16,
    textAlign: 'center',
  },
});