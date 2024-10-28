// import React from "react";
// import { View, ImageBackground } from "react-native";
// import { images } from "@/constants";
// import {DashboardBgProps } from '@/types/type'

// const DashboardBg = ({children }) => {
//     return (
//         <View className="flex-1">
//             <ImageBackground
//                 source={images.otpBg}
//                 className="flex-1 h-full"
//                 resizeMode="cover" 
//             >
//                 {/* Render children inside the background */}
//                 {children}
//             </ImageBackground>
//         </View>
//     );
// };

// export default DashboardBg;


import React from "react";
import { View, ImageBackground } from "react-native";
import { images } from "@/constants";
import { DashboardBgProps } from '@/types/type'

const DashboardBg: React.FC<DashboardBgProps> = ({ children }) => {
    return (
        <View className="flex-1
        ">
            {/* <ImageBackground
                source={images.otpBg}
                className="flex-1"
                resizeMode="cover"
            > */}
                {/* Render children inside the background */}
                {children}
            {/* </ImageBackground> */}
        </View>
    );
};

export default DashboardBg;

