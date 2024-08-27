import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputFields";
import CustomButton from "@/components/customButton";
import { Link, router } from "expo-router";
import { icons, images } from "@/constants";
import { useFormik } from "formik";
import * as Yup from "yup";


// Define Yup validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password cannot exceed 20 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .required('Password is required'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password Confirmation is required')
});

const SetPassword = () => {
    const formik = useFormik({
        initialValues: {
            password: '',
            password_confirmation: '',
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            // TODO: Uncomment this when API is ready.
            // try {
            //     const response = await fetch('http://192.168.162.163:3000/user/register', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify({ ...values, otpOption: otpOption }),
            //     });
        
            //     if (!response.ok) {
            //         const errorData = await response.json();
            //         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
            //     }
        
            //     const data = await response.json();
            //     console.log('Success:', data);
            //     router.replace("/(auth)/otp");
            // } catch (error) {
            //     console.error('Error:', error.message);
            // }

            // TODO: comment all the code below after API is ready.
            console.log("Log In")
            router.replace("/(auth)/sign-in");
        }
    });

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
                            <Image source={images.signUp} className="z-0 w-full h-[250px]" />
                        </View>

                        <View className="flex justify-center items-center p-5" >
                            <Text className="text-xl text-black font-interSemiBold text-center">
                                Start Exploring Our Library – Register Today!
                            </Text>
                        </View>

                        <View className="px-5">
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Password"
                                placeholder="Password"
                                icon={icons.person}
                                value={formik.values.password}
                                onChangeText={formik.handleChange('password')}
                                secureTextEntry
                                error={formik.errors.password}
                            />
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Password Confirmation"
                                placeholder="Password Confirmation"
                                icon={icons.person}
                                value={formik.values.password_confirmation}
                                onChangeText={formik.handleChange('password_confirmation')}
                                secureTextEntry
                                error={formik.errors.password_confirmation}
                            />

                            <View className="flex flex-row items-center justify-center">
                                <CustomButton
                                    title="Sign Up"
                                    onPress={formik.handleSubmit}
                                    className="w-full mt-2"
                                />
                            </View>
                        </View>

                        <Image
                            source={images.signUp1}
                            style={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: 120,
                                height: 120,
                                resizeMode: "contain",
                            }}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default SetPassword;