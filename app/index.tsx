import React from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import className from 'twrnc';

const index = () => {
  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState<string[]>([])
  const [editBoton, setEditBoton] = React.useState(null)
  const agregarTarea = () => {
    if(tarea.trim()){
      if (editBoton !== null){
        setTareas(tareas.map(item =>  item.key === editBoton ? {key:item.key , value:tarea}: item))
        setEditBoton(null)
      }else{
        setTareas([...tareas,{key: tareas.length.toString(), value:tarea}])
      }
      setTarea('')
    }
  }

  const borrarTarea =(key) => {
    setTareas(tareas.filter(item => item.key !== key))
  }
  const editarTarea = (key , value)=>{
    setTarea(value)
    setEditBoton(key)
  }
  return (
    <View style={className`p-3 gap-2`}>
      <Text style={className`text-2xl font-bold`}>
        Tareas
      </Text>

      <View style={className`flex-row justify-between items-center gap-2 bg-white py-2 px-1 rounded-lg`}>
        <TextInput value={tarea} onChangeText={setTarea} 
          placeholder="Nueva tarea..." 
          style={className` bg-blue-100 rounded-lg p-2 text-lg flex-1`}
        />
        <Pressable style={className`p-2 bg-blue-500 rounded items-center`} onPress={agregarTarea}>
          <Text style={className`text-lg font-medium text-white`}>
            {editBoton !==null ? 'Actualizar' : 'Agregar'} tarea
          </Text>
        </Pressable>
      </View>

      
      <FlatList data ={tareas} 
      renderItem={({item}) => (
        <View style= {className`gap-2 my-2 bg-white p-2 rounded-xl`}>
        <Text style = {className`text-lg`}>
          {item.value}
        </Text>
          <View style={className`flex-row justify-center items-center gap-2`}>
            <Pressable onPress={() => editarTarea(item.key, item.value)} style={className`p-2 text-white text-lg bg-blue-500 rounded-lg flex-1 text-center`}>
              Editar
            </Pressable>
            <Pressable onPress={() => borrarTarea(item.key)} style={className`p-2 text-white text-lg bg-red-500 rounded-lg flex-1 text-center`}>
              Eliminar
            </Pressable>
          </View>
      </View>
      )}/>
    </View>
  );
};

export default index;