import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';

type IconName = ComponentProps<typeof Ionicons>['name'];

const icon = (name: IconName) => ({ color, size }: { color: string; size: number }) => (
  <Ionicons name={name} size={size} color={color} />
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2D6B62',
        tabBarStyle: { backgroundColor: '#F8F8F5', borderTopWidth: 2, borderTopColor: '#161616' },
      }}>
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: icon('home') }} />
      <Tabs.Screen name="pomodoro" options={{ title: 'Pomodoro', tabBarIcon: icon('timer') }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tasks', tabBarIcon: icon('checkbox') }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar', tabBarIcon: icon('calendar') }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress', tabBarIcon: icon('stats-chart') }} />
    </Tabs>
  );
}
