import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';

type NombreIcono = ComponentProps<typeof Ionicons>['name'];

const icono = (nombre: NombreIcono) => ({ color, size }: { color: string; size: number }) => (
  <Ionicons name={nombre} size={size} color={color} />
);

export default function LayoutPestanas() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2D6B62',
        tabBarStyle: { backgroundColor: '#F8F8F5', borderTopWidth: 2, borderTopColor: '#161616' },
      }}>
      <Tabs.Screen name="inicio" options={{ title: 'Inicio', tabBarIcon: icono('home') }} />
      <Tabs.Screen name="pomodoro" options={{ title: 'Pomodoro', tabBarIcon: icono('timer') }} />
      <Tabs.Screen name="tareas" options={{ title: 'Tareas', tabBarIcon: icono('checkbox') }} />
      <Tabs.Screen name="calendario" options={{ title: 'Calendario', tabBarIcon: icono('calendar') }} />
      <Tabs.Screen name="progreso" options={{ title: 'Progreso', tabBarIcon: icono('stats-chart') }} />
    </Tabs>
  );
}
