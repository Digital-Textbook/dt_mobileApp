import { router } from "expo-router";
import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import { onboarding } from "./../../constants";
import CustomButton from "@/components/customButton";

const Onboarding = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;

    return (
        <SafeAreaView className="flex h-full items-center justify-between bg-[#F4F3F3]">
            <TouchableOpacity
                onPress={() => {
                    router.replace("/(auth)/users/sign-in");
                }}
                className="w-full flex justify-end items-end p-5"
            >
                <Text className="text-black text-sm font-interSemiBold">Skip</Text>
            </TouchableOpacity>

            <Swiper
                ref={swiperRef}
                loop={false}
                dot={
                    <View className="w-[10px] h-[10px] mx-1 mt-20 bg-[#D9D9D9] rounded-full" />
                }
                activeDot={
                    <View className="w-[10px] h-[10px] mx-1 mt-20 bg-[#225FA7] rounded-full" />
                }
                onIndexChanged={(index) => setActiveIndex(index)}
            >
                {onboarding.map((item) => (
                    <View key={item.id} className="flex items-center justify-center p-2">
                        <Image
                            source={item.image}
                            className="w-full h-[270px] p-5 mt-2"
                            resizeMode="contain"
                        />
                        <View className="flex flex-row item-center justify-center w-full ">
                            <Text className="text-black text-2xl font-bold text-center mx-3 mb-5">
                                {item.title}
                            </Text>
                        </View>
                        <Text className="text-sm font-interMedium text-center text-black mx-7">
                            {item.description}
                        </Text>
                    </View>
                ))}
            </Swiper>

            <CustomButton
                title={isLastSlide ? "Get Started" : "Continue"}
                onPress={() =>
                    isLastSlide
                        ? router.replace("/(auth)/users/sign-in")
                        : swiperRef.current?.scrollBy(1)
                }
            />
        </SafeAreaView>
    );
};

export default Onboarding;
