import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Background from "@/components/BackgroundAstro";
import CustomButton from "@/components/customButton";
import { router } from "expo-router";
import { useFormik } from 'formik';
import * as yup from "yup";
import { icons } from "@/constants";

import getCitizenDetails from "@/services/api/users/GetCitizenDetails";

const searchSchema = yup.object().shape({
    cid: yup
        .string()
        .matches(/^\d{11}$/, "CID/PermitNo must be exactly 11 digits")
        .required("CID/PermitNo is required")
});

const SearchByCid = () => {
    const formik = useFormik({
        initialValues: { cid: '' },
        validationSchema: searchSchema,
        onSubmit: async (formData, { setFieldError }) => {
            try {
                const data = await getCitizenDetails(formData.cid);
                router.push({ pathname: '/(auth)/users/sign-up/bhutanese', params: { ...data } });
            } catch {
                setFieldError('cid', 'CID not found, add manually.');
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
                            Search student by CID
                        </Text>

                        <Text className="text-sm text-black font-interMedium text-center mt-2">
                            Enter the CID number to search students studying in Bhutan.
                            If details not found by CID, please click on add manually.
                        </Text>

                        {/* Search Box */}
                        <View className="w-full mt-2">
                            <View className="flex-row items-center border border-gray-300 bg-white rounded-xl h-[50px]">
                                <TextInput
                                    placeholder="Enter CID/PermitNo..."
                                    placeholderTextColor="#B0B0B0"
                                    className="flex-1 p-3 text-black font-interMedium"
                                    keyboardType="numeric"
                                    maxLength={11}
                                    onBlur={formik.handleBlur('cid')}
                                    onChangeText={formik.handleChange('cid')}
                                    value={formik.values.cid}
                                />

                                <TouchableOpacity
                                    onPress={formik.handleSubmit} // Submitting the form using handleSubmit
                                    className="bg-[#225FA7] h-[50px] p-3 rounded-r-xl"
                                >
                                    <Image source={icons.search} className="w-5 h-5" />
                                </TouchableOpacity>
                            </View>
                            {formik.touched.cid && formik.errors.cid && (
                                <Text className="text-red-500 mt-1 text-sm">
                                    {formik.errors.cid}
                                </Text>
                            )}
                        </View>

                        {/* Add Manually Button */}
                        <View className="w-full mt-0 px-5">
                            <CustomButton
                                title="Add Manually"
                                onPress={() => {
                                    router.push('/(auth)/users/sign-up/bhutanese');
                                }}
                                className="w-full"
                            />
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default SearchByCid;
