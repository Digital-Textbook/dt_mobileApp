import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthContext from '@/context/AuthContext';
import DashboardBg from '@/components/DashboardBg';

const Home = () => {
    const { user } = useContext(AuthContext);

    console.log('User from context:', user); // Debugging

    return (
        <SafeAreaView className="flex-1">
            <DashboardBg />
            <View className="flex-1 justify-center items-center">
                {user ? (
                    <Text className="text-xl">Hello, {user.name}</Text>
                ) : (
                    <Text className="text-xl">Hello, Guest</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Home;
