import React from "react";
import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import CustomButton from "@/components/customButton";
import { Link, router } from "expo-router";
import { icons, images } from "@/constants";

const SignIn = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#F2F2F2]">
                    <View className="flex-1 bg-[#F2F2F2] relative">
                        <View className="relative w-full h-[250px]">
                            <Image source={images.logInBg} />
                        </View>

                        <Image source={images.loginPerson2} className="absolute top-10" />
                        <Image source={images.loginPerson} className="absolute right-0 top-36" />

                        <View className="flex justify-center items-center p-2">
                            <Text className="text-xl text-white font-interSemiBold mt-6 text-center">
                                Are you a Bhutanese or Non-Bhutanese student?
                            </Text>
                            <Text className="text-md text-white font-interSemiBold mt-6 text-center">
                                Select whether you are studying abroad or in Bhutan.
                            </Text>
                        </View>

                        <View className="px-5 flex-1 justify-start">
                            <CustomButton title="Bhutanese" onPress={ () => router.replace('/(auth)/users/search-by-cid') } className="w-full mb-10" />
                            <CustomButton title="Non-Bhutanese" onPress={ () => router.replace('/(auth)/non-bhutanese-sign-up') } className="w-full mt-0" />
                        </View>

                        <Image
                            source={images.signUp}
                            className="z-0 w-full h-[200px]"
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default SignIn;
