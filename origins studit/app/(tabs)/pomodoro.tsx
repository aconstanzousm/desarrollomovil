import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Pomodoro() {
  const [segundos, setSegundos] = useState(25 * 60);
  const [corriendo, setCorriendo] = useState(false);

  useEffect(() => {
    if (!corriendo) return;
    const id = setInterval(() => setSegundos((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [corriendo]);

  const min = String(Math.floor(segundos / 60)).padStart(2, '0');
  const seg = String(segundos % 60).padStart(2, '0');

  return (
    <SafeAreaView className="flex-1 bg-paper p-5">
      <Text className="text-2xl font-work-black text-mint-deep">Pomodoro Timer</Text>
      <View className="flex-1 items-center justify-center">
        <View className="h-64 w-64 items-center justify-center rounded-full border-8 border-mint bg-mint-soft">
          <Text className="text-6xl font-work-black text-mint-deep">{min}:{seg}</Text>
          <Text className="mt-2 rounded-lg border border-ink bg-white px-3 py-1 text-xs">Focus Time</Text>
        </View>
        <Pressable className="mt-8 w-40 items-center rounded-2xl border-2 border-ink bg-mint p-3" onPress={() => setCorriendo(!corriendo)}>
          <Text className="font-work-bold">{corriendo ? 'Pause' : 'Start'}</Text>
        </Pressable>
        <Pressable className="mt-4" onPress={() => { setCorriendo(false); setSegundos(25 * 60); }}>
          <Text className="text-neutral-500 underline">Reiniciar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
