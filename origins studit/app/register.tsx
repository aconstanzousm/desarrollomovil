import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sesion } from '../datos';

export default function Register() {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const registrar = () => {
    if (!usuario || !correo || !clave) return setError('Completa todos los campos');
    sesion.nombre = usuario;
    router.replace('/home');
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-paper p-6">
      <Text className="mb-8 text-center text-xl font-work-medium">Crear Cuenta</Text>
      <Text className="mb-1 font-work-bold">Usuario</Text>
      <TextInput className="mb-4 rounded-md bg-mint p-3" placeholder="yourname" autoCapitalize="none" value={usuario} onChangeText={setUsuario} />
      <Text className="mb-1 font-work-bold">Correo</Text>
      <TextInput className="mb-4 rounded-md bg-mint p-3" placeholder="you@company.com" autoCapitalize="none" value={correo} onChangeText={setCorreo} />
      <Text className="mb-1 font-work-bold">Contraseña</Text>
      <TextInput className="mb-4 rounded-md bg-mint p-3" placeholder="••••••••" secureTextEntry value={clave} onChangeText={setClave} />
      {error !== '' && <Text className="mb-3 text-red-600">{error}</Text>}
      <Pressable className="items-center rounded-2xl border-2 border-ink bg-mint p-3" onPress={registrar}>
        <Text className="text-base font-work-bold">Registrar</Text>
      </Pressable>
      <Pressable className="mt-6" onPress={() => router.replace('/login')}>
        <Text className="text-center font-work-medium">Already have an account? <Text className="font-work-black">Login</Text></Text>
      </Pressable>
    </SafeAreaView>
  );
}
