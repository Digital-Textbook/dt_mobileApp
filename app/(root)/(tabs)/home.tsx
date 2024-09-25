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
            <DashboardBg>
                <View className="flex-1 justify-start items-start">
                    <Text className="text-xl p-2">
                        {user ? (`Hello, ${user.name}`) : ("Hello, Guest")}
                    </Text>
                </View>
            </DashboardBg>
        </SafeAreaView>
    );
};

export default Home;
