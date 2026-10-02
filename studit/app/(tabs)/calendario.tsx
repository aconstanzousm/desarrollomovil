import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from 'react-native-safe-area-context';
import { STORAGE_KEY, Tarea } from '../../datos';

export default function CalendarioScreen() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split('T')[0]
  );

  // vuelve a cargar las tareas cada vez que entras a esta pestaña
  useFocusEffect(
    useCallback(() => {
      const cargarTareas = async () => {
        try {
          const datos = await AsyncStorage.getItem(STORAGE_KEY);
          setTareas(datos ? JSON.parse(datos) : []);
        } catch (error) {
          console.error("Error al cargar tareas:", error);
        }
      };
      cargarTareas();
    }, [])
  );

  // Crear marcas en el calendario para las fechas con tareas
  const fechasMarcadas = tareas.reduce((acc, t) => {
    if (t.fecha) {
      acc[t.fecha] = { marked: true, dotColor: '#2D6B62' };
    }
    return acc;
  }, {} as Record<string, any>);

  // Destacar la fecha seleccionada
  if (fechasMarcadas[fechaSeleccionada]) {
    fechasMarcadas[fechaSeleccionada] = {
      ...fechasMarcadas[fechaSeleccionada],
      selected: true,
      selectedColor: '#ADE3DC',
      selectedTextColor: '#161616',
    };
  } else {
    fechasMarcadas[fechaSeleccionada] = {
      selected: true,
      selectedColor: '#ADE3DC',
      selectedTextColor: '#161616',
    };
  }

  // Filtrar tareas según el día seleccionado en el calendario
  const tareasDelDia = tareas.filter(t => t.fecha === fechaSeleccionada);

  // lista de tareas del dia seleccionado
  return (
    <SafeAreaView className="flex-1 bg-paper">
      <ScrollView contentContainerClassName="p-5">
        <View className="overflow-hidden rounded-2xl border-2 border-ink">
          <Calendar
            onDayPress={(day) => setFechaSeleccionada(day.dateString)}
            markedDates={fechasMarcadas}
            theme={{
              calendarBackground: '#FFFFFF',
              todayTextColor: '#2D6B62',
              arrowColor: '#2D6B62',
              monthTextColor: '#161616',
              textMonthFontFamily: 'WorkSans-Black',
              textDayFontFamily: 'WorkSans-Medium',
              textDayHeaderFontFamily: 'WorkSans-Bold',
              textSectionTitleColor: '#2D6B62',
            }}
          />
        </View>

        <Text className="mb-3 mt-5 font-work-bold">
          Tareas del {fechaSeleccionada}:
        </Text>

        {tareasDelDia.length === 0 && (
          <Text className="text-neutral-500">No hay tareas para este día.</Text>
        )}
        {tareasDelDia.map((item) => (
          <View key={item.key} className="mb-3 rounded-2xl border-2 border-ink bg-white p-3">
            <Text className="text-base font-work-bold">{item.value}</Text>
            {item.descripcion ? (
              <Text className="mt-2 rounded-lg bg-paper p-2 text-sm text-neutral-600">
                {item.descripcion}
              </Text>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
