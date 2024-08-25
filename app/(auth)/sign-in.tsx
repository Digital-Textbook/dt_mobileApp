import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputFields";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";
import { icons, images } from "@/constants";

const SignIn = () => {
    const [form, setForm] = useState({
        student_code: '',
        password: '',
    });

    const onSignUpPress = async () => {
        // Handle the sign-up logic here
    };

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
                            <Image source={images.logInBg}/>
                        </View>

                        <Image
                            source={images.loginPerson2}
                           className="absolute top-10 "
                        />

                        <Image
                            source={images.loginPerson}
                           className="absolute right-0 top-36 "
                        />

                        <View className="flex justify-center items-center p-2">
                            <Text className="text-xl text-white font-interSemiBold mt-10 text-center">
                            Login to Start Your Learning Adventure!                            </Text>
                        </View>

                        <View className="px-5">
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Student Code"
                                placeholder="Student Code"
                                icon={icons.person}
                                value={form.student_code}
                                onChangeText={(value) => setForm({ ...form, student_code: value })}
                            />
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Password"
                                placeholder="Password"
                                icon={icons.person}
                                value={form.password}
                                onChangeText={(value) => setForm({ ...form, password: value })}
                            />

                            <View className="-mt-5">
                                <CustomButton title="Log In" onPress={onSignUpPress} className="w-full " />
                            </View>

                            <Link href="/sign-up" className="text-lg text-left text-general-200 pt-5 -mt-20">
                                <Text>Don't Have An Account?</Text>
                                <Text className="text-primary-500">Register</Text>
                            </Link>
                            <Link href="/sign-up" className="text-lg text-left text-general-200 pt-5 -mt-5">
                                <Text className="text-primary-500">Forgot Password?</Text>
                            </Link>
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
