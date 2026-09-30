import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import className from 'twrnc';

interface Tarea {
  key: string;
  value: string;
}

const STORAGE_KEY = "@mis_tareas_app";

const Index = () => {
  // 1. useRouter debe ir DENTRO del componente
  const router = useRouter();

  const [tarea, setTarea] = useState('');
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [editBoton, setEditBoton] = useState<string | null>(null);

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

  const agregarTarea = () => {
    if (tarea.trim()) {
      let actualizadas: Tarea[];

      if (editBoton !== null) {
        actualizadas = tareas.map(item => 
          item.key === editBoton ? { key: item.key, value: tarea } : item
        );
        setEditBoton(null);
      } else {
        actualizadas = [...tareas, { key: Date.now().toString(), value: tarea }];
      }

      guardarTareas(actualizadas);
      setTarea('');
    }
  };

  const borrarTarea = (key: string) => {
    const filtradas = tareas.filter(item => item.key !== key);
    guardarTareas(filtradas);
  };

  const editarTarea = (key: string, value: string) => {
    setTarea(value);
    setEditBoton(key);
  };

  return (
    <View style={className`p-3 gap-2 flex-1`}>
      <Text style={className`text-2xl font-bold`}>
        Tareas
      </Text>
        
      <View style={className`flex-row justify-between items-center gap-2 bg-white py-2 px-1 rounded-lg`}>
        <TextInput 
          value={tarea} 
          onChangeText={setTarea} 
          placeholder="Nueva tarea..." 
          style={className`bg-blue-100 rounded-lg p-2 text-lg flex-1`}
        />
        <Pressable style={className`p-2 bg-blue-500 rounded items-center`} onPress={agregarTarea}>
          <Text style={className`text-lg font-medium text-white`}>
            {editBoton !== null ? 'Actualizar' : 'Agregar'} tarea
          </Text>
        </Pressable>
      </View>
          
      <FlatList 
        data={tareas}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={className`gap-2 my-2 bg-white p-2 rounded-xl`}>
            <Text style={className`text-lg`}>
              {item.value}
            </Text>
            <View style={className`flex-row justify-center items-center gap-2`}>
              <Pressable 
                onPress={() => editarTarea(item.key, item.value)} 
                style={className`p-2 bg-blue-500 rounded-lg flex-1 items-center`}
              >
                <Text style={className`text-white text-lg`}>Editar</Text>
              </Pressable>
              <Pressable 
                onPress={() => borrarTarea(item.key)} 
                style={className`p-2 bg-red-500 rounded-lg flex-1 items-center`}
              >
                <Text style={className`text-white text-lg`}>Eliminar</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {/* Botón hacia el calendario corregido */}
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