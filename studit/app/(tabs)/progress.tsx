import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sesion } from '../../datos';

export default function Progress() {
  const salir = () => {
    sesion.nombre = '';
    router.replace('/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerClassName="p-5">
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-work-black text-mint-deep">Tu Progreso</Text>
            <Text className="self-start rounded-lg bg-ink px-2 py-1 text-xs text-white">Nivel 1</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-work-black">0%</Text>
            <Text className="text-xs text-neutral-600">0 XP</Text>
          </View>
        </View>

        <View className="mb-4 flex-row justify-between rounded-2xl border-2 border-ink bg-card p-4">
          <View>
            <Text className="text-lg font-work-black">0 días</Text>
            <Text className="text-xs text-neutral-500">Racha actual</Text>
          </View>
          <View className="items-end">
            <Text className="text-lg font-work-black">0 días</Text>
            <Text className="text-xs text-neutral-500">Mejor racha</Text>
          </View>
        </View>

        <View className="mb-6 flex-row gap-3">
          {[['PUNTOS', '0'], ['HORAS', '0h'], ['TAREAS', '0']].map(([l, v]) => (
            <View key={l} className="flex-1 items-center rounded-xl border-2 border-ink bg-mint-soft py-3">
              <Text className="text-[10px] text-neutral-600">{l}</Text>
              <Text className="text-xl font-work-black">{v}</Text>
            </View>
          ))}
        </View>

        <Text className="mb-2 text-lg font-work-black">Insignias</Text>
        <Text className="mb-6 text-neutral-500">Aún no tienes insignias.</Text>

        <Pressable className="items-center rounded-2xl border-2 border-ink bg-white p-3" onPress={salir}>
          <Text className="font-work-bold">Cerrar sesión</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
