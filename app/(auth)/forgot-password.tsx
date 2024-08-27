import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '@/components/customButton';
import InputFields from '@/components/InputFields';
import { icons, images } from '@/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import axios from 'axios';

// Define validation schema with Yup
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
});

const ForgotPassword: React.FC = () => {
    const router = useRouter(); // Get router object

    // Initialize Formik
    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(
                    'http://172.20.10.7:3001/user/forgot-password',
                    { ...values },
                    { headers: { 'Content-Type': 'application/json', 'accept': '*/*' } }
                );
        
                // Handle successful response
                const data = response.data;
                console.log('Success:', data);
        
                // Perform actions based on successful request if needed
                router.replace(`/(auth)/otp/${data["user"]["id"]}`);
            } catch (error: any) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    console.error(`Forgot Password - HTTP error! Status: ${error.response.status}, Message: ${error.response.data.message}`);
                } else {
                    // Something went wrong in setting up the request
                    console.error('Forgot Password - Error:', error.message);
                }
            }
        },
    });

    return (
        <ImageBackground
            source={images.otpBg} 
            className='flex-1 w-full h-full'
            resizeMode='cover'
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-[#F2F2F2]">

                    <View className='flex-1 justify-center px-4 bottom-64'>
                        <TouchableOpacity 
                            onPress={() => router.push('/sign-in')}
                            className="w-full flex justify-start items-start pt-14 pl-5"
                        >
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>

                        <View className="relative w-full h-[250px]">
                            <Image source={images.reset} className="w-full h-[300px]" />

                            <Text className='text-2xl font-bold mb-2 pt-10 text-center'>Reset Password</Text>
                            <Text className='text-lg mb-6 text-center'>
                                Please provide the email address that you used when you signed up for the account.
                            </Text>

                            <InputFields
                                placeholderTextColor="#CCCCCC"
                                label="Email"
                                placeholder="Email"
                                onBlur={handleBlur('email')}
                                icon={icons.person}
                                onChangeText={handleChange('email')}
                                value={values.email}
                                error={touched.email && errors.email}
                            />

                            <CustomButton
                                title="Reset Password"
                                onPress={handleSubmit}
                                className='w-full mt-20'
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
