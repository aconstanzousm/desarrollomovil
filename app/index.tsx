import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, Pressable, Text, TextInput, View } from "react-native";
import className from 'twrnc';
//definicion de interfaz tarea
interface Tarea {
  key: string;
  value: string;
  fecha: string;
}
//donde se guarda
const STORAGE_KEY = "@mis_tareas_app";

const Index = () => {
  const router = useRouter();
//constantes de tarea
  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [editBoton, setEditBoton] = useState<string | null>(null);
  //constantes de fecha
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

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

  const agregarTarea = () => {
    if (tarea.trim()) {
      const fechaString = formatearFechaISO(fechaSeleccionada);
      let actualizadas: Tarea[];

      if (editBoton !== null) {
        actualizadas = tareas.map(item =>
          item.key === editBoton ? { key: item.key, value: tarea, fecha: fechaString } : item
        );
        setEditBoton(null);
      } else {
        actualizadas = [...tareas, { key: Date.now().toString(), value: tarea, fecha: fechaString }];
      }

      guardarTareas(actualizadas);
      setTarea('');
      setFechaSeleccionada(new Date());
    }
  };

  const borrarTarea = (key: string) => {
    const filtradas = tareas.filter(item => item.key !== key);
    guardarTareas(filtradas);
  };

  const editarTarea = (item: Tarea) => {
    setTarea(item.value);
    setEditBoton(item.key);
    if (item.fecha) {
      const [year, month, day] = item.fecha.split('-').map(Number);
      setFechaSeleccionada(new Date(year, month - 1, day));
    }
  };

  return (
    <View style={className`p-4 gap-3 flex-1 bg-gray-100`}>
      <Text style={className`text-2xl font-bold text-gray-800`}>
        Mis Tareas
      </Text>

      <View style={className`bg-white p-3 rounded-xl shadow-sm gap-2`}>
        <TextInput
          value={tarea}
          onChangeText={setTarea}
          placeholder="Escribe una tarea..."
          style={className`bg-gray-100 rounded-lg p-3 text-base text-gray-800`}
        />

        <View style={className`flex-row gap-2 items-center`}>
          {/* Si se ejecuta en Web, mostramos el input date nativo de HTML */}
          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={formatearFechaISO(fechaSeleccionada)}
              onChange={onChangeFechaWeb}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#eff6ff',
                color: '#1e40af',
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
              style={className`p-3 bg-blue-100 rounded-lg flex-1 items-center justify-center`}
            >
              <Text style={className`text-blue-800 font-semibold text-sm`}>
                {formatearFechaISO(fechaSeleccionada)}
              </Text>
            </Pressable>
          )}

          <Pressable
            style={className`p-3 bg-blue-600 rounded-lg flex-1 items-center justify-center`}
            onPress={agregarTarea}
          >
            <Text style={className`text-base font-bold text-white`}>
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
      </View>

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={className`gap-2 my-1 bg-white p-3 rounded-xl shadow-sm`}>
            <View style={className`flex-row justify-between items-center`}>
              <Text style={className`text-lg font-semibold flex-1 text-gray-800`}>{item.value}</Text>
              <Text style={className`text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-1 rounded-full`}>
                {item.fecha}
              </Text>
            </View>

            <View style={className`flex-row justify-center items-center gap-2 mt-1`}>
              <Pressable
                onPress={() => editarTarea(item)}
                style={className`p-2 bg-blue-500 rounded-lg flex-1 items-center`}
              >
                <Text style={className`text-white font-medium`}>Editar</Text>
              </Pressable>

              <Pressable
                onPress={() => borrarTarea(item.key)}
                style={className`p-2 bg-red-500 rounded-lg flex-1 items-center`}
              >
                <Text style={className`text-white font-medium`}>Eliminar</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <Pressable
        style={className`p-3 bg-emerald-600 rounded-lg items-center mt-2`}
        onPress={() => router.push('/(calendario)')}
      >
        <Text style={className`text-white text-lg font-bold`}>
          Ir a Calendario
        </Text>
      </Pressable>
    </View>
  );
};

export default Index;