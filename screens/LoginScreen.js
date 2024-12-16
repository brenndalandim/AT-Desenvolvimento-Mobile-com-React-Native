import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function LoginScreen({ navigation, setUser }) {

  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Insira um e-mail válido');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve conter 6 dígitos');
      return;
    }

    const user = { name: 'João da Silva', email: email };
    setUser(user)
    navigation.navigate('Home');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login InfnetFood</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={handleLogin} >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    color: '#000'
  },
  button: {
    backgroundColor: '#BB86FC',
    padding: 15,
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center',
  }
});