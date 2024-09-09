import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import Background from "@/components/BackgroundAstro";
import CustomButton from "@/components/customButton";
import InputField from "@/components/InputFields";
import RadioButton from "@/components/radioButton";
import { Link, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { icons } from "@/constants";
import * as yup from "yup";
import { useFormik } from "formik";
import register from "@/services/api/users/Register";

// Defined Yup validation schema for the sign-up form
const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    cidNo: yup.string().required('CID No is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    mobileNo: yup.string().required('Mobile Number is required'),
    gender: yup.string().required('Gender is required'),
});

const BhutaneseSignUpForm = () => {
    const { cidNo, name, gender } = useGlobalSearchParams();

    const formik = useFormik({
        initialValues: {
            name,
            cidNo,
            gender, // backend is not accepting this arg as of now.
            email: '',
            mobileNo: '',
            otpOption: ''
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values, { setFieldError }) => {
            try {
                const response = await register(values);
                const userId = response.data['user']['id'];
                router.replace(`/(auth)/otp/${userId}`);
            } catch(error: any) {
                const { status, data } = error.response;

                if(status === 409) {
                    setFieldError('cidNo', data.message)
                }
            }
        }
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
            className="flex-1"
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1" keyboardShouldPersistTaps="handled">
                    <Background />

                    {/* Search Section */}
                    <View className="justify-center items-center p-2 -mt-20 ">
                        <Text className="text-xl text-black font-interSemiBold text-center">
                            Registration form for Bhutanese
                        </Text>

                        <View className="w-full mt-2 px-5">
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="CID"
                                placeholder="CID No"
                                className="rounded-none py-2"
                                icon={icons.person}
                                value={formik.values.cidNo}
                                onChangeText={formik.handleChange('cidNo')}
                                error={formik.errors.cidNo}
                                disabled={true}
                            />

                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Name"
                                placeholder="Name"
                                className="rounded-none py-2"
                                icon={icons.person}
                                value={formik.values.name}
                                onChangeText={formik.handleChange('name')}
                                error={formik.errors.name}
                            />

                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Gender"
                                placeholder="Gender"
                                className="rounded-none py-2 capitalize"
                                icon={icons.person}
                                value={formik.values.gender}
                                onChangeText={formik.handleChange('gender')}
                                error={formik.errors.gender}
                            />
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Email"
                                placeholder="Email"
                                className="rounded-none py-2 lowercase"
                                icon={icons.person}
                                value={formik.values.email}
                                onChangeText={formik.handleChange('email')}
                                error={formik.errors.email}
                            />

                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Mobile Number"
                                placeholder="Mobile Number"
                                className="rounded-none py-2"
                                icon={icons.person}
                                value={formik.values.mobileNo}
                                onChangeText={formik.handleChange('mobileNo')}
                                error={formik.errors.mobileNo}
                            />

                            <View className="my-1">
                                <Text className="text-md text-black mb-2">Choose OTP Option:</Text>
                                <View className="flex-row flex-start gap-4">
                                    <View>
                                        <RadioButton
                                            label="Email"
                                            value="email"
                                            selectedValue={formik.values.otpOption}
                                            onSelect={formik.handleChange('otpOption')}
                                        />
                                    </View>

                                    <View>
                                        <RadioButton
                                            label="Mobile"
                                            value="mobile"
                                            selectedValue={formik.values.otpOption}
                                            onSelect={formik.handleChange('otpOption')}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View className="flex flex-row items-center justify-center">
                                <CustomButton
                                    title="Sign Up"
                                    onPress={formik.handleSubmit}
                                    className="w-full mt-2"
                                />
                            </View>

                            <Link href="/sign-in" className="text-lg text-left text-general-200 bottom-20">
                                <Text>Already Have An Account?</Text>
                                <Text className="text-[#225FA7] font-interSemiBold">Log In</Text>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default BhutaneseSignUpForm;
