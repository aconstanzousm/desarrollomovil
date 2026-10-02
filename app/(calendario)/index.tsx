import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import className from 'twrnc';

interface Tarea {
  key: string;
  value: string;
  fecha: string; // "YYYY-MM-DD"
}

const STORAGE_KEY = "@mis_tareas_app";

export default function CalendarioScreen() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const datos = await AsyncStorage.getItem(STORAGE_KEY);
        if (datos) {
          setTareas(JSON.parse(datos));
        }
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };
    cargarTareas();
  }, []);

  // Crear marcas en el calendario para las fechas con tareas
  const fechasMarcadas = tareas.reduce((acc, t) => {
    if (t.fecha) {
      acc[t.fecha] = { marked: true, dotColor: '#10B981' };
    }
    return acc;
  }, {} as Record<string, any>);

  // Destacar la fecha seleccionada
  if (fechasMarcadas[fechaSeleccionada]) {
    fechasMarcadas[fechaSeleccionada] = {
      ...fechasMarcadas[fechaSeleccionada],
      selected: true,
      selectedColor: '#3B82F6',
    };
  } else {
    fechasMarcadas[fechaSeleccionada] = {
      selected: true,
      selectedColor: '#3B82F6',
    };
  }

  // Filtrar tareas según el día seleccionado en el calendario
  const tareasDelDia = tareas.filter(t => t.fecha === fechaSeleccionada);

  return (
    <View style={className`flex-1 p-3 bg-gray-100`}>
      <Calendar
        onDayPress={(day) => setFechaSeleccionada(day.dateString)}
        markedDates={fechasMarcadas}
        theme={{
          todayTextColor: '#3B82F6',
          arrowColor: '#3B82F6',
        }}
      />

      <Text style={className`text-xl font-bold mt-4 mb-2`}>
        Tareas del {fechaSeleccionada}:
      </Text>

      <FlatList
        data={tareasDelDia}
        keyExtractor={(item) => item.key}
        ListEmptyComponent={
          <Text style={className`text-gray-500 italic`}>No hay tareas para este día.</Text>
        }
        renderItem={({ item }) => (
          <View style={className`bg-white p-3 rounded-lg my-1 shadow-sm`}>
            <Text style={className`text-base`}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
}