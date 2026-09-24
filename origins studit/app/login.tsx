import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sesion } from '../datos';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const entrar = () => {
    if (!email || !password) return setError('Completa tu correo y contraseña');
    sesion.nombre = email.split('@')[0];
    router.replace('/home');
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-paper p-6">
      <Text className="mb-6 text-center text-5xl font-work-black">Studit</Text>
      <View className="rounded-2xl border-2 border-ink bg-white p-5">
        <Text className="mb-4 text-center text-2xl font-work-black">Welcome Back!</Text>
        <Text className="mb-1 font-work-bold">Email</Text>
        <TextInput className="mb-3 rounded-lg border border-neutral-400 p-3" placeholder="you@student.edu" autoCapitalize="none" value={email} onChangeText={setEmail} />
        <Text className="mb-1 font-work-bold">Password</Text>
        <TextInput className="mb-3 rounded-lg border border-neutral-400 p-3" placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} />
        {error !== '' && <Text className="mb-3 text-red-600">{error}</Text>}
        <Pressable className="items-center rounded-2xl border-2 border-ink bg-mint p-3" onPress={entrar}>
          <Text className="text-base font-work-bold">Let's Go</Text>
        </Pressable>
      </View>
      <Pressable className="mt-6" onPress={() => router.push('/register')}>
        <Text className="text-center font-work-medium">New here? <Text className="font-work-black">Sign up</Text></Text>
      </Pressable>
    </SafeAreaView>
  );
}
