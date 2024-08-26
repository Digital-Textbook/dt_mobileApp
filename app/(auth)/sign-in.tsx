import React from "react";
import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputFields";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";
import { icons, images } from "@/constants";

// Define the validation schema with Yup
const validationSchema = Yup.object().shape({
    student_code: Yup.string()
        .required("Student Code is required"),
    password: Yup.string()
        .required("Password is required")
});

const SignIn = () => {
    // Initialize Formik with initial values and validation schema
    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            student_code: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            // Handle the sign-up logic here
            console.log(values);
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

                        <Image
                            source={images.loginPerson2}
                            className="absolute top-10"
                        />

                        <Image
                            source={images.loginPerson}
                            className="absolute right-0 top-36"
                        />

                        <View className="flex justify-center items-center p-2">
                            <Text className="text-xl text-white font-interSemiBold mt-6 text-center">
                                Login to Start Your Learning Adventure!
                            </Text>
                        </View>

                        <View className="px-5">
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Student Code"
                                placeholder="Student Code"
                                icon={icons.person}
                                value={values.student_code}
                                onChangeText={handleChange('student_code')}
                                onBlur={handleBlur('student_code')}
                                error={touched.student_code && errors.student_code}
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

                            <Link href="/sign-up" className="text-lg text-left text-general-200 pt-6 -mt-20">
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
