import React from "react";
import { View, ImageBackground } from "react-native";
import { images } from "@/constants"; // Ensure the images object is correctly imported

const DashboardBg = ({ children }) => {
    return (
        <View className="flex-1">
            <ImageBackground
                source={images.otpBg}
                style={{ flex: 1 }} // Ensures it covers the whole view
                resizeMode="cover" // Adjust image resizing behavior
            >
                {/* Render children inside the background */}
                {children}
            </ImageBackground>
        </View>
    );
};

export default DashboardBg;
