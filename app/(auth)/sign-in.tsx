import React from "react";
import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputFields";
import CustomButton from "@/components/customButton";
import { Link, router } from "expo-router";
import { icons, images } from "@/constants";
import axios from 'axios';

// Define the validation schema with Yup
const validationSchema = Yup.object().shape({
    cid_no: Yup.string()
        .required("Student Code is required"),
    password: Yup.string()
        .required("Password is required")
});

const SignIn = () => {
    // Initialize Formik with initial values and validation schema
    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            cid_no: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    'http://172.20.10.7:3001/auth/login',
                    { cidNo: values['cid_no'], password: values['password'] },
                    { headers: { 'Content-Type': 'application/json', 'accept': '*/*' } }
                );
        
                // Handle successful response
                const data = response.data;
                console.log('Login Success: ', data);
        
                router.replace('/(root)/(tabs)/home');
            } catch (error: any) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    console.error(`HTTP error! Status: ${error.response.status}, Message: ${error.response.data.message}`);
                } else {
                    // Something went wrong in setting up the request
                    console.error('Error:', error.message);
                }
            }
        },
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
                            <Image source={images.logInBg} />
                        </View>

                        <Image source={images.loginPerson2} className="absolute top-10" />
                        <Image source={images.loginPerson} className="absolute right-0 top-36" />

                        <View className="flex justify-center items-center p-2">
                            <Text className="text-xl text-white font-interSemiBold mt-6 text-center">
                                Login to Start Your Learning Adventure!
                            </Text>
                        </View>

                        <View className="px-5">
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Cid No / Permit No"
                                placeholder="Cid/Permit Number"
                                icon={icons.person}
                                value={values.cid_no}
                                onChangeText={handleChange('cid_no')}
                                onBlur={handleBlur('cid_no')}
                                error={touched.cid_no && errors.cid_no}
                            />
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Password"
                                placeholder="Password"
                                icon={icons.person}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                error={touched.password && errors.password}
                            />

                            <View className="-mt-5">
                                <CustomButton title="Log In" onPress={handleSubmit} className="w-full" />
                            </View>

                            <Link href="/user-type" className="text-lg text-left text-general-200 pt-6 -mt-20">
                                <Text>Don't Have An Account?</Text>
                                <Text className="text-primary-500">Register</Text>
                            </Link>
                            <View>
                            <Link href="/forgot-password" className="text-lg text-left text-general-200 pt-5 -mt-1">
                                <Text className="text-primary-500 ">Forgot Password?</Text>
                            </Link>
                            </View>
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
