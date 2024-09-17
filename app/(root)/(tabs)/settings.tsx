import React, { useContext } from 'react';
import CustomButton from '@/components/customButton';
import AuthContext from '@/context/AuthContext';
import { router } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Setting = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            console.log("Attempting to log out...");
            console.log("User in context during logout:", user);
            if (user && user.id) {
                await logout();
                console.log("Logout successful");
                router.replace("/(auth)/users/sign-in");
            } else {
                console.error("User ID not found in context during logout");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-center items-center p-4">
            <Text className="text-2xl font-bold mb-4">Settings</Text>
            <CustomButton
                title="Log Out"
                onPress={handleLogout}
                className="w-full mt-2"
            />
        </SafeAreaView>
    );
};

export default Setting;

