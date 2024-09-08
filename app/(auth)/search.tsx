import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import Background from "@/components/BackgroundAstro";
import CustomButton from "@/components/customButton";
import InputField from "@/components/InputFields";
import RadioButton from "@/components/radioButton";
import { Link, router } from "expo-router";
import { icons } from "@/constants";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import { useFormik } from "formik";

// Defined validation schema using Yup for the search form
const searchSchema = yup.object().shape({
    cid: yup
        .string()
        .matches(/^\d{11}$/, "CID/PermitNo must be exactly 11 digits")
        .required("CID/PermitNo is required")
});

// Defined Yup validation schema for the sign-up form
const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    cidNo: yup.string().required('CID No is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    mobileNo: yup.string().required('Mobile Number is required'),
    gender: yup.string().required('Gender is required'),
});

const Search = () => {
    const [loading, setLoading] = useState(false);
    const [cidError, setCidError] = useState('');
    const [userId, setUserId] = useState('');
    const [formVisible, setFormVisible] = useState(false); // State to control form visibility
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(searchSchema),
        mode: "onChange"
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            cidNo: '',
            email: '',
            mobileNo: '',
            gender: ''
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            try {
                const response = await axios.patch(
                    `http://192.168.101.47:3001/user/registerByCid/${userId}`,
                    {
                        email: values['email'],
                        mobileNo: values['mobileNo'],
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                const data = response.data;
                console.log('Success:', data);

                // Navigate to the OTP page
                router.replace(`/(auth)/otp/${userId}`);
            } catch (error) {
                if (error.response) {
                    console.error(`HTTP error! Status: ${error.response.status}, Message: ${error.response.data.message}`);
                } else {
                    console.error('Error:', error.message);
                }
            }
        }
    });

    const fetchCitizenDetails = async (cidNo) => {
        if (cidNo.length !== 11) return;

        setLoading(true);
        try {
            const response = await axios.post(`http://192.168.101.47:3001/user/getCidDetail/${cidNo}`, {}, {
                headers: { 'accept': '*/*' }
            });

            const data = response.data;
            setUserId(data.id);
            setValue('cid', data.cid_no);
            formik.setFieldValue('cidNo', data.cidNo); // Auto-fill CID
            formik.setFieldValue('name', data.name);
            formik.setFieldValue('gender', data.gender);
            setCidError('');
            setFormVisible(true); // Show the sign-up form
        } catch (error) {
            setCidError('CID not found, add manually.');
            setFormVisible(false); // Hide the form and show the "Add Manually" button
            console.error('Error fetching citizen details:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // const fetchCitizenDetails = async (cidNo) => {
    //     if (cidNo.length !== 11) return;
    
    //     setLoading(true);
    //     try {
    //         const response = await axios.post(`http://192.168.101.25:3001/user/getCidDetail/${cidNo}`, {}, {
    //             headers: { 'accept': '*/*' }
    //         });
    
    //         const data = response.data;
    //         setUserId(data.id);
    //         setValue('cid', data.cid_no);
    //         formik.setFieldValue('cidNo', data.cidNo); // Auto-fill CID
    //         formik.setFieldValue('name', data.name);
    //         formik.setFieldValue('gender', data.gender);
    //         setCidError(''); // Clear any previous errors
    //         setFormVisible(true); // Show the sign-up form
    //     } catch (error) {
    //         // Handle different error scenarios
    //         if (error.response) {
    //             if (error.response.status === 404) {
    //                 setCidError('CID not found. Please add details manually.');
    //             } else {
    //                 setCidError('An error occurred while fetching the details. Please try again.');
    //             }
    //         } else {
    //             setCidError('An unexpected error occurred. Please check your network connection.');
    //         }
    //         setFormVisible(false); // Hide the form and show the "Add Manually" button
    //         console.error('Error fetching citizen details:', error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    

    const onSubmit = (data) => {
        fetchCitizenDetails(data.cid);
    };

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
        className="flex-1"
    >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1"  keyboardShouldPersistTaps="handled">
                <Background />

                {/* Search Section */}
                <View className="justify-center items-center p-2 -mt-20 ">
                    <Text className="text-xl text-black font-interSemiBold text-center">
                        Search student by CID
                    </Text>
                    <Text className="text-sm text-black font-interMedium text-center mt-2">
                        Enter the CID number to search students studying in Bhutan.
                        If details not found by CID, please click on add manually.
                    </Text>

                    {/* Search Box */}
                    <View className="w-full mt-2">
                        <Controller
                            control={control}
                            name="cid"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="flex-row items-center border border-gray-300 bg-white rounded-xl h-[50px]">
                                    <TextInput
                                        placeholder="Enter CID/PermitNo..."
                                        placeholderTextColor="#B0B0B0"
                                        className="flex-1 p-3 text-black font-interMedium"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        keyboardType="numeric"
                                        maxLength={11}
                                    />
                                    <TouchableOpacity
                                        onPress={handleSubmit(onSubmit)}
                                        className="bg-[#225FA7] h-[50px] p-3 rounded-r-xl"
                                    >
                                        <Image
                                            source={icons.search}
                                            className="w-5 h-5"
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        {errors.cid && (
                            <Text className="text-red-500 mt-1 text-sm">
                                {errors.cid.message}
                            </Text>
                        )}
                        {cidError && (
                            <Text className="text-red-500 mt-1 text-sm">
                                {cidError}
                            </Text>
                        )}
                    </View>

                    {/* Add Manually Button */}
                    {!formVisible && (
                        <View className="w-full mt-0 px-5">
                            <CustomButton
                                title="Add Manually"
                                onPress={() => {
                                    // Handle manual addition if needed
                                }}
                                className="w-full"
                            />
                        </View>
                    )}

                    {/* Sign Up Form */}
                    {formVisible && (
                        <View className= "w-full mt-2 px-5">
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="CID"
                                placeholder="CID No"
                                icon={icons.person}
                                value={formik.values.cidNo}
                                onChangeText={formik.handleChange('cidNo')}
                                error={formik.errors.cidNo}
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
                    )}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Search;





                                        

