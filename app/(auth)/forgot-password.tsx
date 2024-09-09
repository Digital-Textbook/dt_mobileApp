import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '@/components/customButton';
import InputFields from '@/components/InputFields';
import { icons, images } from '@/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { router, useRouter } from 'expo-router';
import axios from 'axios';
import forgotPassword from '@/services/api/users/ForgotPassword';
import InputField from '@/components/InputFields';

// Define validation schema with Yup
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
});

const ForgotPassword: React.FC = () => {
    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values, { setFieldError, setFieldValue }) => {
            try {
                const response = await forgotPassword(values.email);
                const data = response.data;
                router.replace(`/(auth)/otp/${data["user"]["id"]}`);
            } catch (error: any) {
                const { status, data } = error.response;
                if (status === 404) {
                    setFieldError('email', data.message);
                }
            }
        },
    });

    return (
        <ImageBackground
            source={images.otpBg}
            className='w-full h-full'
            resizeMode='cover'
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#F2F2F2]">
                        <View className='flex justify-start px-4 items-start'>
                            <View className='flex flex-row items-start justify-start pl-5 pt-14'>
                                {/* <TouchableOpacity onPress={() => router.push('/users/sign-in')}>
                                    <Ionicons name="arrow-back" size={24} color="black" />
                                </TouchableOpacity> */}
                            </View>

                            <Image source={images.reset} className="w-full h-60" />

                            <View className="relative">
                                <Text className='text-2xl font-bold mb-2 pt-10 text-center'>Reset Password</Text>
                                <Text className='text-lg mb-6 text-center'>
                                    Please provide the email address that you used when you signed up for the account.
                                </Text>
                            </View>

                            <View className='w-full'>
                                <InputField
                                    placeholderTextColor="#CCCCCC"
                                    label="Email"
                                    placeholder="Email"
                                    className='py-2 rounded-none'
                                    icon={icons.person}
                                    onChangeText={formik.handleChange('email')}
                                    value={formik.values.email}
                                    error={formik.errors.email}
                                />
                                <CustomButton
                                    title="Reset Password"
                                    onPress={formik.handleSubmit}
                                    className='w-full mt-1'
                                />
                            </View>
                        </View>
                    </ScrollView>

                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

export default ForgotPassword;
