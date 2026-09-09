import { products } from "@/store/products.store";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";

const ProductsScreen = () => {
    return (
        <View className="flex-1 bg-slate-50 px-4 py-2">
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                     <View className="w-24 h-24 bg-slate-100 rounded-xl items-center justify-center overflow-hidden mr-4">
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: "20%", height: 300, borderRadius: 50, marginTop: 0, marginBottom: 0 }}
                            contentFit="contain"
                        />
                        <Text className="mt-3 text-2xl font-work-black">{item.title}</Text>
                        <Text className="mt-1 text-base text-gray-600">{item.description}</Text>

                        <View className="mt-3 flex-row items-center justify-between">
                            <Text className="text-lg font-bold">${item.price.toFixed(2)}</Text>
                            <Link href={`/(stack)/products/${item.id}`} className="text-primary font-work-black">
                                <Text className="text-lg font-bold">Ver Detalle</Text>
                            </Link>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default ProductsScreen;