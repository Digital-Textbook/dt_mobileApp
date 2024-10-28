// import React, { useContext } from 'react';
// import { View, Text } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AuthContext from '@/context/AuthContext';
// import DashboardBg from '@/components/DashboardBg';

// const Home = () => {
//     const { user } = useContext(AuthContext);

//     console.log('User from context:', user); // Debugging

//     return (
//         <SafeAreaView className="flex-1">
//             <DashboardBg>
//                 <View className="flex-1 justify-start items-start">
//                     <Text className="text-xl p-2">
//                         {user ? (`Hello, ${user.name}`) : ("Hello, Guest")}
//                     </Text>
//                     <View className=''>

//                     </View>
//                 </View>
//             </DashboardBg>
//         </SafeAreaView>
//     );
// };

// export default Home;

import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthContext from '@/context/AuthContext';
import DashboardBg from '@/components/DashboardBg';
import BookList from '@/components/BookList';



const Home = () => {
    const { user } = useContext(AuthContext);  

    return (
        <SafeAreaView className="flex-1">
            <DashboardBg>
                <View className="flex-1 justify-start items-start p-2">
                    <Text className="font-interBold text-xl p-2">
                        {user ? `Hello, ${user.name}` : "Hello, Guest"}
                    </Text>
                    <BookList/>
                </View>
            </DashboardBg>
        </SafeAreaView>
    );
};

export default Home;


{/* <View className="my-4">
                        <Text className="text-2xl font-interBold">Continue Reading </Text>
                    </View>

                    <View className="bg-white rounded-lg p-2 shadow-md w-full h-2/6 my-2">
                    <View className="bg-black rounded-lg p-4 w-3/6 h-full ">
                    </View>
                        <Text className=" text-lg text-"></Text>
                    </View>
                    <View className="my-2">
                        <Text className="text-2xl font-interBold">Text Books </Text>
                    </View>

                    <View className="flex-row justify-between w-full h-72">
                        <View className="bg-white rounded-lg p-4 shadow-md w-[48%]">
                            <Text className="text-lg">text book 1</Text>
                        </View>
                        <View className="bg-white rounded-lg p-4 shadow-md w-[48%]">
                            <Text className="text-lg">text book  2</Text>
                        </View>
                    </View> */}