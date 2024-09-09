import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ImageBackground, Image, TouchableOpacity } from 'react-native';
import CustomButton from "@/components/customButton";
import { images } from '@/constants'; // Make sure to import your image correctly
import { Link, router, useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HandleInputChange } from '@/types/type';
import axios from "axios";
import verifyEmail from '@/services/api/users/VerifyEmail';

const OTPInput = () => {
    const { user_id } = useLocalSearchParams();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs: (TextInput | null)[] = [];

    const handleInputChange: HandleInputChange = (text, index) => {
        if (isNaN(Number(text))) return;

        const newOtp = [...otp];
        newOtp[index] = text;

        setOtp(newOtp);

        if (text && index < 5) {
            const nextInput = inputRefs[index + 1];
            nextInput?.focus();
        }
    };

    const handleSubmit = async () => {
        try {
            const response = verifyEmail(user_id as string, otp.join(''));
            router.replace(`/(auth)/set-password/${user_id}`);
        } catch (error: any) {
            const { status, data } = error.response;
            console.log(`OTP PAGE ERROR : ${status} : ${data.message}`);
        }
    };

    return (
        <ImageBackground
            source={images.otpBg}
            className='flex-1 w-full h-full'
            resizeMode='cover'

        >

            <TouchableOpacity
                // onPress={() => navigation.goBack()}
                className="w-full flex justify-start items-start pt-14 pl-5"
            >
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 justify-center items-center"
            >

                <View className='flex items-center justify-center bottom-10'>
                    <Image
                        source={images.shieldOtp}
                        className="absolute w-1/3 h-[160px]"
                    />


                </View>
                <Text className="text-2xl font-semibold text-gray-800 mb-5 pt-10">Enter OTP</Text>
                <Text className="text-lg text-black mb-5 text-center">
                    Please enter the 6-digit code below to verify your account and proceed.
                </Text>

                <View className="flex-row justify-center items-center w-full px-10">
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(input) => { inputRefs[index] = input; }}
                            value={digit}
                            onChangeText={(text) => handleInputChange(text, index)}
                            maxLength={1}
                            keyboardType="numeric"
                            className="w-12 h-12 border-2 border-gray-400 text-center text-xl font-semibold rounded-md mx-1"
                        />
                    ))}
                </View>

                <View className="-mt-5 w-11/12">
                    <CustomButton title="Submit" onPress={handleSubmit} className='w-full' />
                </View>
                <View className="flex-row pt-20 -mt-20">

                    <Link href="/otp" className="text-lg text-left text-general-200 pt-5 -mt-20">
                        <Text>Didn’t receive the code?</Text>
                        <Text className="text-primary-500">Resend</Text>
                    </Link>
                </View>

            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

export default OTPInput;