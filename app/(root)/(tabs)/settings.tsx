


// import React, { useContext, useEffect } from 'react';
// import { SafeAreaView, Text } from 'react-native';
// import CustomButton from '@/components/customButton';
// import AuthContext from '@/context/AuthContext';
// import { router } from 'expo-router';

// const Setting = () => {
//     const { user, logout } = useContext(AuthContext);

//     useEffect(() => {
//         console.log("User from context in Setting:", user);
//     }, [user]);

//     const handleLogout = async () => {
//         try {
//             console.log("Attempting to log out...");
//             await logout();
//             console.log("Logout successful");
//             router.replace("/(auth)/users/sign-in");
//         } catch (error) {
//             console.error("Logout failed:", error);
//         }
//     };

//     return (
//         <SafeAreaView className="flex-1 justify-center items-center p-4">
//             <Text className="text-2xl font-bold mb-4">Settings</Text>
//             <CustomButton
//                 title="Log Out"
//                 onPress={handleLogout}
//                 className="w-full mt-2"
//             />
//         </SafeAreaView>
//     );
// };

// export default Setting;

// components/Setting.js
// import React, { useContext, useEffect } from 'react';
// import { SafeAreaView, Text, Alert } from 'react-native';
// import CustomButton from '@/components/customButton';
// import AuthContext from '@/context/AuthContext';
// import { router } from 'expo-router';

// const Setting = () => {
//     const { user, logout } = useContext(AuthContext);

//     useEffect(() => {
//         console.log("User from context in Setting:", user);
//     }, [user]);

//     const handleLogout = async () => {
//         if (!user) {
//             Alert.alert("Error", "No user is logged in.");
//             return;
//         }

//         try {
//             console.log("Attempting to log out...");
//             // Call the logout function with the user ID
//             await logout(user.id);
//             console.log("Logout successful");
//             // Redirect to the sign-in page after logout
//             router.replace("/(auth)/users/sign-in");
//         } catch (error) {
//             console.error("Logout failed:", error);
//             Alert.alert("Logout Error", "Failed to log out. Please try again.");
//         }
//     };

//     return (
//         <SafeAreaView className="flex-1 justify-center items-center p-4">
//             <Text className="text-2xl font-bold mb-4">Settings</Text>
//             <CustomButton
//                 title="Log Out"
//                 onPress={handleLogout}
//                 className="w-full mt-2"
//             />
//         </SafeAreaView>
//     );
// };

// export default Setting;
// components/Setting.js
import React, { useContext, useEffect } from 'react';
import { SafeAreaView, Text, Alert } from 'react-native';
import CustomButton from '@/components/customButton';
import AuthContext from '@/context/AuthContext';
import { router } from 'expo-router';

const Setting = () => {
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        console.log("User from context in Setting:", user);
    }, [user]);

    const handleLogout = async () => {
        if (!user) {
            Alert.alert("Error", "No user is logged in.");
            return;
        }

        try {
            console.log("Attempting to log out...");
            await logout(user.id); // Pass the user ID to the logout function
            console.log("Logout successful");
            router.replace("/(auth)/users/sign-in");
        } catch (error) {
            console.error("Logout failed:", error);
            Alert.alert("Logout Error", "Failed to log out. Please try again.");
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
