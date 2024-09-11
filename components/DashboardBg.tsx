import React from "react";
import { View, Image, StatusBar } from "react-native";
import { images } from "@/constants";

const DashboardBg = () => {
    return (
        <View className="flex-1 ">
            <Image 
                source={images.otpBg} 
            />
        </View>
    );
};

export default DashboardBg;
