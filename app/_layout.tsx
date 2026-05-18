import { Stack, Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
 import AntDesign from '@expo/vector-icons/AntDesign';
 

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Shopping list",
        tabBarIcon:({color, size}) => {
            return <Entypo name="list" size={size} color={color} />
        }
       }} />
      <Tabs.Screen name="counter" options={{ title: "Counter", 
        headerShown: false,
        tabBarIcon: ({color, size}) => {
            return <AntDesign name="clock-circle" size={size} color={color} />
        }
      }} />
      <Tabs.Screen name="idea" options={{ title: "Idea",
        tabBarIcon: ({color, size}) => {
            return <Entypo name="light-bulb" size={size} color={color} />
        }
      }} />
    </Tabs>
  );
}