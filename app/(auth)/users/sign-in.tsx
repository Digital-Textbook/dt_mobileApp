import React from "react";
import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "@/components/InputFields";
import CustomButton from "@/components/customButton";
import { Link, router } from "expo-router";
import { icons, images } from "@/constants";
import login from "@/services/api/auth/Session";
import { useSession } from "@/context/AuthContext";

// Define the validation schema with Yup
const validationSchema = Yup.object().shape({
    cid_no: Yup.string()
        .required("Student Code is required"),
    password: Yup.string()
        .required("Password is required")
});

const SignIn = () => {
    const { signIn } = useSession();

    const formik = useFormik({
        initialValues: { cid_no: '11504000875', password: 'Password@123' },
        validationSchema,
        onSubmit: async (values, { setFieldError }) => {
            try {
                const response = signIn(values.cid_no, values.password);
                router.replace("/(root)/(tabs)/home");
            } catch (error : any) {
                const { status, data } = error.response;

                if(status == 409) {
                    setFieldError('cid_no', data.message);
                }
            }
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

                        <Image source={images.loginPerson2} className="absolute top-10" />
                        <Image source={images.loginPerson} className="absolute right-0 top-36" />

                        <View className="flex justify-center items-center p-2">
                            <Text className="text-xl text-white font-interSemiBold mt-6 text-center">
                                Login to Start Your Learning Adventure!
                            </Text>
                        </View>

                        <View className="px-5">
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Cid No / Permit No"
                                placeholder="Cid/Permit Number"
                                className="py-2 rounded-none"
                                icon={icons.person}
                                value={formik.values.cid_no}
                                onChangeText={formik.handleChange('cid_no')}
                                onBlur={formik.handleBlur('cid_no')}
                                error={formik.errors.cid_no}
                            />
                            <InputField
                                placeholderTextColor="#CCCCCC"
                                label="Password"
                                placeholder="Password"
                                className="py-2 rounded-none"
                                icon={icons.person}
                                value={formik.values.password}
                                onChangeText={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                error={formik.errors.password}
                            />

                            <View className="-mt-5">
                                <CustomButton title="Log In" onPress={formik.handleSubmit} className="w-full" />
                            </View>

                            <Link href="/user-type" className="text-lg text-left text-general-200 pt-6 -mt-20">
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