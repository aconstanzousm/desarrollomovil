import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sesion } from '../../datos';

export default function Home() {
  const [ramos, setRamos] = useState<string[]>([]);
  const [nombre, setNombre] = useState('');

  const agregar = () => {
    if (!nombre.trim()) return;
    setRamos([...ramos, nombre.trim()]);
    setNombre('');
  };

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerClassName="p-5">
        <Text className="text-3xl font-work-black">Hola, {sesion.nombre}</Text>
        <Text className="mb-4 text-neutral-500">Sigue avanzando en tus estudios</Text>

        <View className="mb-6 rounded-2xl bg-mint p-4">
          <Text className="text-xs font-work-bold text-mint-deep">ESFUERZO SEMANAL</Text>
          <Text className="text-4xl font-work-black">0h 0m</Text>
        </View>

        <Text className="mb-3 text-xl font-work-black">Mis Ramos</Text>
        {ramos.length === 0 && <Text className="mb-3 text-neutral-500">Aún no tienes ramos. Agrega el primero.</Text>}
        {ramos.map((r, i) => (
          <View key={i} className="mb-3 rounded-lg border-2 border-ink bg-card p-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-work-bold">{r}</Text>
              <Pressable onPress={() => setRamos(ramos.filter((_, j) => j !== i))}>
                <Text className="text-neutral-500">Quitar</Text>
              </Pressable>
            </View>
            <Text className="mb-2 text-xs text-neutral-500">0h 0m esta semana</Text>
            <View className="h-2 rounded-full bg-neutral-200" />
          </View>
        ))}

        <TextInput className="mb-3 mt-2 rounded-lg border-2 border-ink bg-white p-3" placeholder="Nombre del ramo" value={nombre} onChangeText={setNombre} />
        <Pressable className="items-center rounded-2xl border-2 border-ink bg-mint p-3" onPress={agregar}>
          <Text className="font-work-bold">+ Agregar Ramo</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
