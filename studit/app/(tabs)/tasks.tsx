import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STORAGE_KEY, Tarea } from '../../datos';

export default function Tasks() {
//constantes de tarea
  const [tarea, setTarea] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [editBoton, setEditBoton] = useState<string | null>(null);
  //constantes de fecha
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

  // al abrir la pantalla traemos las tareas guardadas
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const datos = await AsyncStorage.getItem(STORAGE_KEY);
        if (datos !== null) {
          setTareas(JSON.parse(datos));
        }
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };

    cargarTareas();
  }, []);

  // guarda la lista en el estado y en el storage
  const guardarTareas = async (nuevasTareas: Tarea[]) => {
    try {
      setTareas(nuevasTareas);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasTareas));
    } catch (error) {
      console.error("Error al guardar las tareas:", error);
    }
  };
  //agarrar las fechas
  const formatearFechaISO = (fecha: Date) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onChangeFecha = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setMostrarDatePicker(false);
    }

    if (selectedDate) {
      setFechaSeleccionada(selectedDate);
      if (Platform.OS === 'ios') {
        setMostrarDatePicker(false);
      }
    } else {
      setMostrarDatePicker(false);
    }
  };

  // Manejador específico para el input fecha en la Web
  const onChangeFechaWeb = (e: any) => {
    const valor = e.target.value; // "YYYY-MM-DD"
    if (valor) {
      const [y, m, d] = valor.split('-').map(Number);
      setFechaSeleccionada(new Date(y, m - 1, d));
    }
  };

  // agrega una tarea nueva o actualiza si estamos editando
  const agregarTarea = () => {
    if (tarea.trim()) {
      const fechaString = formatearFechaISO(fechaSeleccionada);
      let actualizadas: Tarea[];

      if (editBoton !== null) {
        actualizadas = tareas.map(item =>
          item.key === editBoton ? { key: item.key, value: tarea, descripcion, fecha: fechaString } : item
        );
        setEditBoton(null);
      } else {
        actualizadas = [...tareas, { key: Date.now().toString(), value: tarea, descripcion, fecha: fechaString }];
      }

      guardarTareas(actualizadas);
      setTarea('');
      setDescripcion('');
      setFechaSeleccionada(new Date());
    }
  };

  // saca la tarea de la lista por su key
  const borrarTarea = (key: string) => {
    const filtradas = tareas.filter(item => item.key !== key);
    guardarTareas(filtradas);
  };

  // carga los datos de la tarea en el formulario para editarla
  const editarTarea = (item: Tarea) => {
    setTarea(item.value);
    setDescripcion(item.descripcion || '');
    setEditBoton(item.key);
    if (item.fecha) {
      const [year, month, day] = item.fecha.split('-').map(Number);
      setFechaSeleccionada(new Date(year, month - 1, day));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerClassName="p-5">
        <Text className="mb-4 text-2xl font-work-black">Mis Tareas</Text>

        {/* formulario de la tarea */}
        <TextInput
          value={tarea}
          onChangeText={setTarea}
          placeholder="Escribe una tarea..."
          className="mb-2 rounded-lg border-2 border-ink bg-white p-3"
        />
        <TextInput
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Descripción u observaciones..."
          multiline
          numberOfLines={2}
          className="mb-3 min-h-12 rounded-lg border-2 border-ink bg-white p-3"
        />

        <View className="mb-6 flex-row items-center gap-2">
          {/* Si se ejecuta en Web, mostramos el input date nativo de HTML */}
          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={formatearFechaISO(fechaSeleccionada)}
              onChange={onChangeFechaWeb}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '2px solid #161616',
                backgroundColor: '#DDF1EE',
                color: '#2D6B62',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                flex: 1
              }}
            />
          ) : (
            /* Si se ejecuta en Android / iOS, usamos el botón + DateTimePicker nativo */
            <Pressable
              onPress={() => setMostrarDatePicker(true)}
              className="flex-1 items-center justify-center rounded-lg border-2 border-ink bg-mint-soft p-3"
            >
              <Text className="text-sm font-work-bold text-mint-deep">
                {formatearFechaISO(fechaSeleccionada)}
              </Text>
            </Pressable>
          )}

          <Pressable
            className="flex-1 items-center justify-center rounded-2xl border-2 border-ink bg-mint p-3"
            onPress={agregarTarea}
          >
            <Text className="font-work-bold">
              {editBoton !== null ? 'Actualizar' : 'Agregar'}
            </Text>
          </Pressable>
        </View>

        {/* Solo se renderiza en móviles si el usuario hace clic */}
        {mostrarDatePicker && Platform.OS !== 'web' && (
          <DateTimePicker
            value={fechaSeleccionada}
            mode="date"
            display="default"
            onChange={onChangeFecha}
          />
        )}

        {/* lista de tareas */}
        {tareas.map((item) => (
          <View key={item.key} className="mb-3 gap-2 rounded-2xl border-2 border-ink bg-white p-3">
            <View className="flex-row items-center justify-between">
              <Text className="flex-1 text-lg font-work-bold">{item.value}</Text>
              <Text className="rounded-full border border-ink bg-mint-soft px-2 py-1 text-xs font-work-medium text-mint-deep">
                {item.fecha}
              </Text>
            </View>
            {item.descripcion ? (
              <Text className="rounded-lg bg-paper p-2 text-sm text-neutral-600">
                {item.descripcion}
              </Text>
            ) : null}
            <View className="mt-1 flex-row items-center justify-center gap-2">
              <Pressable
                onPress={() => editarTarea(item)}
                className="flex-1 items-center rounded-2xl border-2 border-ink bg-mint p-2"
              >
                <Text className="font-work-bold">Editar</Text>
              </Pressable>

              <Pressable
                onPress={() => borrarTarea(item.key)}
                className="flex-1 items-center rounded-2xl border-2 border-ink bg-white p-2"
              >
                <Text className="font-work-bold">Eliminar</Text>
              </Pressable>
            </View>
          </View>
        ))}

        <Pressable
          className="mt-2 items-center rounded-2xl border-2 border-ink bg-mint p-3"
          onPress={() => router.push('/calendario')}
        >
          <Text className="text-lg font-work-bold">
            Ir a Calendario
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
