import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputFields";
import CustomButton from "@/components/customButton";
import { Link, router } from "expo-router";
import { icons, images } from "@/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import RadioButton from "@/components/radioButton";
import axios from "axios";

// Define Yup validation schema
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    permit_number: Yup.string().required('CID No is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile_no: Yup.string().required('Mobile Number is required'),
});

const NonBhutaneseSignUpForm = () => {
    const [otpOption, setOtpOption] = useState('email');
    const formik = useFormik({
        initialValues: {
            name: '',
            permit_number: '',
            email: '',
            mobile_no: '',
            gender: ''
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            console.log(values)
            try {
                console.log({ 
                    name: values['name'],
                    permitNo: values['permit_number'],
                    email: values['email'],
                    mobileNo: values['mobile_no'],
                    userType: 'Bhutanese_with_permit',
                    gender: values['gender'].toUpperCase(),
                    otpOption,
                });
                const response = await axios.post(
                    'http://172.20.10.7:3001/user/registerByPermit', 
                    { 
                        name: values['name'],
                        permitNo: values['permit_number'],
                        email: values['email'],
                        mobileNo: values['mobile_no'],
                        userType: 'Bhutanese_with_permit',
                        gender: values['gender'].toUpperCase(),
                        otpOption,
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                );
        
                // Handle successful response
                const data = response.data;
                console.log('Success:', data);
        
                // Navigate to the OTP page
                router.replace(`/(auth)/otp/${data["user"]["id"]}`);
            } catch (error: any) {
                if (error.response) {
                    console.error(`HTTP error! Status: ${error.response.status}, Message: ${error.response.data.message}`);
                } else {
                    console.error('Error:', error.message);
                }
            }
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
                                label="Name"
                                placeholder="Name"
                                icon={icons.person}
                                value={formik.values.name}
                                onChangeText={formik.handleChange('name')}
                                error={formik.errors.name}
                            />
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Permit Number"
                                placeholder="Permit Number"
                                icon={icons.person}
                                value={formik.values.permit_number}
                                onChangeText={formik.handleChange('permit_number')}
                                error={formik.errors.permit_number}
                            />
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="gender"
                                placeholder="Gender"
                                icon={icons.person}
                                value={formik.values.gender}
                                onChangeText={formik.handleChange('gender')}
                                error={formik.errors.gender}
                            />
                            {/* <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Student Code"
                                placeholder="Student Code"
                                icon={icons.person}
                                value={formik.values.student_code}
                                onChangeText={formik.handleChange('student_code')}
                                error={formik.errors.student_code}
                            /> */}
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Email"
                                placeholder="Email"
                                icon={icons.person}
                                value={formik.values.email}
                                onChangeText={formik.handleChange('email')}
                                error={formik.errors.email}
                            />
                        
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Mobile Number"
                                placeholder="Mobile Number"
                                icon={icons.person}
                                value={formik.values.mobile_no}
                                onChangeText={formik.handleChange('mobile_no')}
                                error={formik.errors.mobile_no}
                            />
                            {/* <InputField
                                placeholderTextColor="#CCCCCC"
                                label="User Type"
                                placeholder="User Type"
                                icon={icons.person}
                                value={formik.values.user_type}
                                onChangeText={formik.handleChange('user_type')}
                                error={formik.errors.user_type}
                            /> */}
                            {/* <InputField
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
                            /> */}

                            <View className="my-1">
                                <Text className="text-md text-gray-700 mb-2">Choose OTP Option:</Text>
                                <View className="flex-row flex-start gap-4">
                                    <View>
                                        <RadioButton
                                            label="Email"
                                            value="email"
                                            selectedValue={otpOption}
                                            onSelect={setOtpOption}
                                        />
                                    </View>

                                    <View>
                                        <RadioButton
                                            label="Mobile"
                                            value="mobile"
                                            selectedValue={otpOption}
                                            onSelect={setOtpOption}
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

                            <Link href="/sign-in" className="text-lg text-left text-general-200 bottom-16">
                                <Text>Already Have An Account?</Text>
                                <Text className="text-primary-500">Log In</Text>
                            </Link>
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

export default NonBhutaneseSignUpForm;
