import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputFields";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";
import { icons, images } from "@/constants";
import { useFormik } from "formik";
import * as Yup from "yup";

// Define Yup validation schema
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    cid_no: Yup.string().required('CID No is required'),
    student_code: Yup.string().required('Student Code is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile_no: Yup.string().required('Mobile Number is required'),
    user_type: Yup.string().required('User Type is required'),
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

const SignUp = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const formik = useFormik({
        initialValues: {
            name: '',
            cid_no: '',
            student_code: '',
            email: '',
            mobile_no: '',
            user_type: '',
            password: '',
            password_confirmation: '',
            otpOption: 'email'
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            console.log(values)
            try {
                const response = await fetch('http://192.168.162.163:3000/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });
        
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
                }
        
                const data = await response.json();
                console.log('Success:', data);
                // Handle success
            } catch (error) {
                console.error('Error:', error.message);
                // Handle error
            }
        }
        
    });

    const validateCurrentStep = async () => {
        const { errors, validateField, validateForm } = formik;
        let isValid = true;

        switch (currentStep) {
            case 1:
                await validateField('name');
                await validateField('cid_no');
                await validateField('student_code');
                if (errors.name || errors.cid_no || errors.student_code) {
                    isValid = false;
                }
                break;
            case 2:
                await validateField('email');
                await validateField('mobile_no');
                if (errors.email || errors.mobile_no) {
                    isValid = false;
                }
                break;
            case 3:
                await validateField('user_type');
                await validateField('password');
                await validateField('password_confirmation');
                if (errors.user_type || errors.password || errors.password_confirmation) {
                    isValid = false;
                }
                break;
        }
        return isValid;
    };

    const nextStep = async () => {
        const isValid = await validateCurrentStep();
        if (isValid) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            } else {
                formik.handleSubmit();
            }
        }
    };

    const previousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
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
                            <Image source={images.signUp} className="z-0 w-full h-[300px]" />
                        </View>

                        <View className="flex justify-center items-center p-5">
                            <Text className="text-xl text-black font-interSemiBold mt-10 text-center">
                                Start Exploring Our Library – Register Today!
                            </Text>
                        </View>

                        <View className="px-5">
                            {currentStep === 1 && (
                                <>
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
                                        label="CID"
                                        placeholder="CID No"
                                        icon={icons.person}
                                        value={formik.values.cid_no}
                                        onChangeText={formik.handleChange('cid_no')}
                                        error={formik.errors.cid_no}
                                    />
                                    <InputField
                                        placeholderTextColor="#CCCCCC"
                                        label="Student Code"
                                        placeholder="Student Code"
                                        icon={icons.person}
                                        value={formik.values.student_code}
                                        onChangeText={formik.handleChange('student_code')}
                                        error={formik.errors.student_code}
                                    />
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
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
                                </>
                            )}

                            {currentStep === 3 && (
                                <>
                                    <InputField
                                        placeholderTextColor="#CCCCCC"
                                        label="User Type"
                                        placeholder="User Type"
                                        icon={icons.person}
                                        value={formik.values.user_type}
                                        onChangeText={formik.handleChange('user_type')}
                                        error={formik.errors.user_type}
                                    />
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
                                </>
                            )}

                            <View className="flex flex-row items-center justify-center bottom-8">
                                {currentStep > 1 && (
                                    <CustomButton title="Previous" onPress={previousStep} className="w-1/2" />
                                )}
                                <CustomButton
                                    title={currentStep === 3 ? "Sign Up" : "Next"}
                                    onPress={nextStep}
                                    className={`w-${currentStep > 1 ? '1/2' : 'full'} mx-2`}
                                />
                            </View>

                            {currentStep === 1 && (
                                <Link href="/sign-in" className="text-lg text-left text-general-200 pt-5 -mt-20 mb-10 bottom-10">
                                    <Text>Already Have An Account?</Text>
                                    <Text className="text-primary-500">Log In</Text>
                                </Link>
                            )}
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

export default SignUp;
