import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import className from 'twrnc';

interface Tarea {
  key: string;
  value: string;
  fecha: string; // "YYYY-MM-DD"
  descripcion?: string;
  completado?: boolean; // Nuevo estado
}

const STORAGE_KEY = "@mis_tareas_app";

export default function CalendarioScreen() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    cargarTareas();
  }, []);

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

  // Función para alternar el estado de completado y actualizar AsyncStorage
  const toggleCompletado = async (key: string) => {
    const tareasActualizadas = tareas.map((t) =>
      t.key === key ? { ...t, completado: !t.completado } : t
    );
    setTareas(tareasActualizadas);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tareasActualizadas));
    } catch (error) {
      console.error("Error al guardar tarea:", error);
    }
  };

  // Crear marcas en el calendario para las fechas con tareas
  const fechasMarcadas = tareas.reduce((acc, t) => {
    if (t.fecha) {
      acc[t.fecha] = { marked: true, dotColor: '#10B981' };
    }
    return acc;
  }, {} as Record<string, any>);

  // Destacar la fecha seleccionada
  fechasMarcadas[fechaSeleccionada] = {
    ...fechasMarcadas[fechaSeleccionada],
    selected: true,
    selectedColor: '#3B82F6',
  };

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
          <TouchableOpacity
            onPress={() => toggleCompletado(item.key)}
            style={className`bg-white p-3 rounded-lg my-1 shadow-sm flex-row items-center justify-between`}
          >
            <View style={className`flex-1 mr-2`}>
              <Text
                style={className`text-base ${
                  item.completado ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {item.value}
              </Text>
              {item.descripcion && (
                <Text style={className`text-sm text-gray-600 bg-gray-50 p-2 rounded-lg mt-1`}>
                  {item.descripcion}
                </Text>
              )}
            </View>

            {/* Indicador de estado */}
            <View
              style={className`px-2.5 py-1 rounded-full ${
                item.completado ? 'bg-green-100' : 'bg-amber-100'
              }`}
            >
              <Text
                style={className`text-xs font-semibold ${
                  item.completado ? 'text-green-700' : 'text-amber-700'
                }`}
              >
                {item.completado ? 'Completada' : 'Pendiente'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}