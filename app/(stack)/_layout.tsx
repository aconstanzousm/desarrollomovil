import { Stack } from "expo-router";
const StackLayout = () => {
    return (
        <Stack
            screenOptions={{
                // headerShown: false,
                headerShadowVisible: false,
                contentStyle: { backgroundColor: "white" },
            }}
            >
            <Stack.Screen
                name="index" 
                options={{ title: "Productos" }} />
            <Stack.Screen
                name="[id]"
                options={{ title: "Detalle del producto" }} />
        </Stack>
    );
};

export default StackLayout;