import React from "react";
import { View, Image } from "react-native";
import { images } from "@/constants";

const Background = () => {
    return (
        <View className="flex-1 bg-[#F2F2F2] relative">
            <View className="relative w-full h-[250px]">
                <Image source={images.otpBg} />
            </View>
            <Image
                source={images.signUp}
                className="absolute top-0 w-full h-[200px] z-0"
            />
           

            {/* <Image source={images.loginPerson2} className="absolute top-10" /> */}
            {/* <Image source={images.loginPerson} className="absolute right-0 top-36" /> */}

            {/* <Image
                source={images.signUp}
                className="absolute bottom-0 w-full h-[200px] z-0"
            /> */}
        </View>
    );
};

export default Background;
