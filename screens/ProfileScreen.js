import { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Button, Alert, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

export default function ProfileScreen({ user, toggleTheme, isDarkMode }) {
  const { colors } = useTheme();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  useEffect(() => {
    const checkNotificationPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      setIsNotificationEnabled(status === 'granted');
    };

    checkNotificationPermission();
  }, []);

  const askForNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      setIsNotificationEnabled(true);
      Alert.alert('Permissão Concedida', 'Você agora receberá notificações.');
    } else {
      setIsNotificationEnabled(false);
      Alert.alert('Permissão Negada', 'Você não receberá notificações.');
    }
  };

  if (!user) {
    return <Text style={{ color: colors.text }}>Carregando...</Text>;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s' }}
        style={styles.profileImage}
      />

      <Text style={[styles.title, { color: colors.text }]}>Perfil do Usuário</Text>
      <Text style={[styles.text, { color: colors.text }]}>Nome: {user.name}</Text>
      <Text style={[styles.text, { color: colors.text }]}>E-mail: {user.email}</Text>

      <View style={styles.toggleContainer}>
        <Text style={[styles.text, { color: colors.text }]}>Modo Escuro</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <View style={styles.toggleContainer}>
        <Text style={[styles.text, { color: colors.text }]}>Notificações</Text>
        <Button
          title={isNotificationEnabled ? 'Desabilitar Notificações' : 'Habilitar Notificações'}
          onPress={askForNotificationPermission}
          color={colors.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#BB86FC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 12,
  },
});