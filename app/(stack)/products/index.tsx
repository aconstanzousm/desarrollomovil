import { products } from "@/store/products.store";
import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";

const ProductsScreen = () => {
    return (
        <View className="flex flex-1 px-4">
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="mt-10">
                        <Text className="text-2x1 font-work-black">{item.title}</Text>
                        <Text className="">{item.description}</Text>

                        <View className="flex flex-row justify-between mt-2"></View>
                            <Text className="text-lg font-bold">${item.price}</Text>
                            <Link
                                href={`/(stack)/products/${item.id}`}
                                className="text-primary font-work-black"
                            >
                                <Text className="text-lg font-bold">
                                    Ver Detalle
                                </Text>

                            </Link>
                        
                    </View>
                )}
            />
        </View>
    );
};

export default ProductsScreen;