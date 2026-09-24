import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default function Calendar() {
  const hoy = new Date();
  const [sel, setSel] = useState(hoy.getDate());
  const vacios = (new Date(hoy.getFullYear(), hoy.getMonth(), 1).getDay() + 6) % 7;
  const total = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
  const dias = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerClassName="p-5">
        <Text className="mb-4 text-2xl font-work-black">{meses[hoy.getMonth()]} {hoy.getFullYear()}</Text>
        <View className="mb-2 flex-row">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((d, i) => (
            <Text key={i} className="flex-1 text-center font-work-bold text-mint-deep">{d}</Text>
          ))}
        </View>
        <View className="flex-row flex-wrap">
          {Array.from({ length: vacios }).map((_, i) => (
            <View key={i} style={{ width: '14.28%' }} />
          ))}
          {dias.map((d) => (
            <Pressable key={d} style={{ width: '14.28%' }} className="items-center py-1" onPress={() => setSel(d)}>
              <View className={`h-10 w-10 items-center justify-center rounded-xl ${sel === d ? 'border-2 border-ink bg-mint' : ''}`}>
                <Text className="font-work-medium">{d}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <Text className="mb-3 mt-5 font-work-bold">Agenda del {sel} de {meses[hoy.getMonth()].toLowerCase()}</Text>
        <Text className="text-neutral-500">Sin actividades este día.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
