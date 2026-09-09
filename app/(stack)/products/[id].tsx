import { products } from "@/store/products.store";
import { Image } from "expo-image";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const ProductScreen = () => {
    const { id } = useLocalSearchParams();
    const productId = Array.isArray(id) ? id[0] : id;
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return <Redirect href="/" />;
    }

    return (
        <View className="mt-2 px-5">
            <Image
                source={{ uri: product.image }}
                style={{ width: '100%', height: 260, borderRadius: 16, marginTop: 16, marginBottom: 16 }}
                contentFit="cover"
            />
            <Text className="font-work-bold size text-2xl justify-between">{product.title}</Text>
            <View className="flex-col">
                <Text className="text-base text-gray-700">{product.description}</Text>
                <Text className="mt-4 font-work-black text-xl">${product.price.toFixed(2)}</Text>
            </View>
        </View>
    );
};

export default ProductScreen;