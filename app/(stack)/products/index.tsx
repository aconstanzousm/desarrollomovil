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
                contentContainerStyle={{ paddingBottom: 16 }}
                renderItem={({ item }) => (
                    <View className="mb-4 flex-row rounded-xl bg-white p-3 shadow-sm">
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 112, height: 112, borderRadius: 12 }}
                            contentFit="contain"
                        />
                        <View className="ml-3 flex-1 justify-between">
                            <View>
                                <Text className="text-lg font-work-black" numberOfLines={2}>
                                    {item.title}
                                </Text>
                                <Text className="mt-1 text-sm text-gray-600" numberOfLines={3}>
                                    {item.description}
                                </Text>
                            </View>

                            <View className="mt-2 flex-row items-center justify-between">
                                <Text className="text-lg font-bold">${item.price.toFixed(2)}</Text>
                                <Link href={`/(stack)/products/${item.id}`} className="text-primary font-work-black">
                                    Ver Detalle
                                </Link>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default ProductsScreen;