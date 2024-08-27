import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
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
    cid_no: Yup.string().required('CID No is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile_no: Yup.string().required('Mobile Number is required'),
    gender: Yup.string().required('Gender is required'),
});

const SignUp = () => {
    const [otpOption, setOtpOption] = useState('email');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            cid_no: '',
            email: '',
            mobile_no: '',
            gender: ''
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            console.log({ ...values, otpOption });

            console.log({ email: values['email'], mobileNo: values['mobile_no'], otpOption });

            try {
                const response = await axios.patch(
                    `http://172.20.10.7:3001/user/registerByCid/${userId}`, 
                    {
                        email: values['email'],
                        mobileNo: values['mobile_no'],
                        otpOption: otpOption
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                );
        
                // Handle successful response
                const data = response.data;
                console.log('Success:', data);
        
                // Navigate to the OTP page
                router.replace(`/(auth)/otp/${userId}`);
            } catch (error: any) {
                if (error.response) {
                    console.error(`HTTP error! Status: ${error.response.status}, Message: ${error.response.data.message}`);
                } else {
                    console.error('Error:', error.message);
                }
            }
        }
    });

    const fetchCitizenDetails = async (cid_no) => {
        if (cid_no.length !== 11) return; // Ensure CID is exactly 11 characters long
    
        setLoading(true);
        try {
            const response = await axios.post(`http://172.20.10.7:3001/user/getCidDetail/${cid_no}`, {}, {
                headers: { 'accept': '*/*', }
            });
    
            // Since axios automatically parses the JSON, you can access the data directly
            const data = response.data;
            setUserId(data.id);
            // Populate name and gender fields
            formik.setFieldValue('name', data.name);
            formik.setFieldValue('gender', data.gender);
        } catch (error) {
            console.error('Error fetching citizen details:', error.message);
        } finally {
            setLoading(false);
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
                            <Image source={images.signUp} className="z-0 w-full h-[250px]" />
                        </View>

                        <View className="flex justify-center items-center p-5">
                            <Text className="text-xl text-black font-interSemiBold text-center">
                                Start Exploring Our Library – Register Today!
                            </Text>
                        </View>

                        <View className="px-5">
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="CID"
                                placeholder="CID No"
                                icon={icons.person}
                                value={formik.values.cid_no}
                                onChangeText={(text) => {
                                    formik.handleChange('cid_no')(text);
                                    fetchCitizenDetails(text);  // Fetch citizen details on CID input change
                                }}
                                error={formik.errors.cid_no}
                            />
                            {loading && <ActivityIndicator size="small" color="#0000ff" />}

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
                                label="Gender"
                                placeholder="Gender"
                                icon={icons.person}
                                value={formik.values.gender}
                                onChangeText={formik.handleChange('gender')}
                                error={formik.errors.gender}
                            />
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

export default SignUp;
