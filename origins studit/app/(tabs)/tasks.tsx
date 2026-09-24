import { router } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Tarea = { id: number; hora: string; titulo: string; hecho: boolean };

export default function Tasks() {
  const [items, setItems] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState('');
  const [hora, setHora] = useState('');
  const [alerta, setAlerta] = useState(false);

  const guardar = () => {
    setItems([...items, { id: Date.now(), hora, titulo, hecho: false }]);
    setTitulo('');
    setHora('');
    setAlerta(false);
  };

  const agregar = () => {
    if (!titulo.trim() || !hora.trim()) return;
    if (items.some((i) => i.hora === hora)) return setAlerta(true);
    guardar();
  };

  const cambiar = (id: number) => setItems(items.map((i) => (i.id === id ? { ...i, hecho: !i.hecho } : i)));

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerClassName="p-5">
        <Text className="mb-4 text-2xl font-work-black">Rutinas</Text>

        <View className="mb-6 flex-row items-center justify-between rounded-2xl border-2 border-ink bg-mint p-4">
          <View>
            <Text className="text-base font-work-bold">Focus Timer</Text>
            <Text className="text-xs text-mint-deep">25 min session</Text>
          </View>
          <Pressable className="rounded-lg border-2 border-ink bg-white px-4 py-2" onPress={() => router.push('/pomodoro')}>
            <Text className="font-work-bold">Start</Text>
          </Pressable>
        </View>

        <TextInput className="mb-2 rounded-lg border-2 border-ink bg-white p-3" placeholder="Tarea" value={titulo} onChangeText={setTitulo} />
        <TextInput className="mb-3 rounded-lg border-2 border-ink bg-white p-3" placeholder="Hora (ej. 9:00)" value={hora} onChangeText={setHora} />
        <Pressable className="mb-6 items-center rounded-2xl border-2 border-ink bg-mint p-3" onPress={agregar}>
          <Text className="font-work-bold">+ Agregar tarea</Text>
        </Pressable>

        <Text className="mb-3 font-work-bold">Mi Rutina de Hoy</Text>
        {items.length === 0 && <Text className="text-neutral-500">Aún no tienes tareas.</Text>}
        {items.map((i) => (
          <Pressable key={i.id} onPress={() => cambiar(i.id)} className={`mb-3 flex-row items-center rounded-2xl border-2 border-ink p-3 ${i.hecho ? 'bg-neutral-200' : 'bg-card'}`}>
            <Text className="w-16 text-xs text-neutral-500">{i.hora}</Text>
            <Text className="flex-1 font-work-bold">{i.titulo}</Text>
            <Text className="text-[10px] font-work-bold">{i.hecho ? 'COMPLETADO' : 'PENDIENTE'}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Modal transparent animationType="fade" visible={alerta}>
        <View className="flex-1 items-center justify-center bg-black/40 p-6">
          <View className="w-full rounded-3xl border-2 border-ink bg-card p-6">
            <Text className="text-center text-xl font-work-bold">¿Estás seguro de que quieres poner otra tarea?</Text>
            <Text className="mb-5 mt-2 text-center text-neutral-500">Ya hay otra en la misma franja horaria.</Text>
            <Pressable className="mb-3 items-center rounded-2xl border-2 border-ink bg-mint p-3" onPress={guardar}>
              <Text className="font-work-bold">Sí, añadir</Text>
            </Pressable>
            <Pressable className="items-center rounded-2xl border-2 border-ink bg-white p-3" onPress={() => setAlerta(false)}>
              <Text className="font-work-bold">Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
