import CustomButton from "@/components/shared/CustomButton";
import { router } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView>
        <View className="px-10 mt-5">
            <CustomButton
                className="mb-2"
                color="primary"
                onPress={() => router.push('./products')}
            >
                Go to Products
            </CustomButton>
        </View>
    </SafeAreaView>
  );
};

export default HomeScreen;