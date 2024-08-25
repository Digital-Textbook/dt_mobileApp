// import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native"
// import { LinearGradient } from 'expo-linear-gradient';
// import {icons, images} from "@/constants";
// import React, { useState } from "react";
// import InputField from "@/components/InputFields";
// import CustomButton from "@/components/customButton";
// import { Link } from "expo-router";

// const SignUp = () =>{
//     const [form, setForm] = useState({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//         student_code: '',
//         mobile_no: '',
//         user_type: '',
//         cid_no: ''
//     })

//     const onSignUpPress = async () => {}

//     return(
//         <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
//         style={{ flex: 1 }}
//         >
//           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

//         <ScrollView className = "flex-1 bg-[#F2F2F2] ">
//             <View className="flex-1 bg-[#F2F2F2]">
//                 <View className='relative w-full h-[250px]'>
//                     <Image source={images.signUp} className="z-0 w-full h-[300px]"/>
//                     {/* <LinearGradient
//                       colors={['transparent', 'rgba(255, 255, 255, 1)']} // Adjust colors as needed
//                      className="absolute left-0 right-0 bottom-0 h-1/2"
//                     /> */}
//                 </View>

//                 <View className="flex justify-center items-center p-5">
//                     <Text className="text-xl text-black font-interSemiBold mt-10 text-center">Start Exploring Our Library – Register Today!</Text>
//                 </View>


//                 <View className="px-5">
//                     <InputField
//                         placeholderTextColor="#CCCCCC"
//                         label ="Name"
//                         placeholder = "Name"
//                         icon = {icons.person}
//                         value={form.name}
//                         onChangeText={(value) => setForm({...form, name: value})}
//                     />

//                     <InputField
//                         placeholderTextColor="#CCCCCC"
//                         label ="CID"
//                         placeholder = "CID No"
//                         icon = {icons.person}
//                         value={form.cid_no}
//                         onChangeText={(value) => setForm({...form, cid_no: value})}
//                     />
 
//                     <InputField
//                         placeholderTextColor="#CCCCCC"
//                         label ="Student Code"
//                         placeholder = "Student Code"
//                         icon = {icons.person}
//                         value={form.student_code}
//                         onChangeText={(value) => setForm({...form, student_code: value})}
//                     />

//                     <InputField
//                         placeholderTextColor="#CCCCCC"
//                         label ="Email"
//                         placeholder = "Email"
//                         icon = {icons.person}
//                         value={form.email}
//                         onChangeText={(value) => setForm({...form, email: value})}
//                     />
  
//                     <InputField
//                         placeholderTextColor="#CCCCCC"
//                         label ="Mobile Number"
//                         placeholder = "Mobile Number"
//                         icon = {icons.person}
//                         value={form.mobile_no}
//                         onChangeText={(value) => setForm({...form, mobile_no: value})}
//                     />

//                     <InputField
//                         placeholderTextColor="#CCCCCC"
//                         label ="User Type"
//                         placeholder = "User Type"
//                         icon = {icons.person}
//                         value={form.user_type}
//                         onChangeText={(value) => setForm({...form, user_type: value})}
//                     />

//                     <InputField
//                         placeholderTextColor="#CCCCCC"
//                         label ="Password"
//                         placeholder = "Password"
//                         icon = {icons.person}
//                         value={form.password}
//                         onChangeText={(value) => setForm({...form, password: value})}
//                     />

//                     <InputField
//                         placeholderTextColor="#CCCCCC"
//                         label ="Password Confirmation"
//                         placeholder = "Password Confirmation"
//                         icon = {icons.person}
//                         value={form.password_confirmation}
//                         onChangeText={(value) => setForm({...form, password_confirmation: value})}
//                     />

//                     <CustomButton
//                         title="Sign Up"
//                         onPress={onSignUpPress}
//                         className="w-full"
//                     />

//                     {/* OAuth */}
//                     <Link 
//                         href="/sign-in"
//                         className="text-lg text-left text-general-200 pt-5 -mt-20 mb-10"
//                         >
//                             <Text>
//                                 Already Have An Account?
//                             </Text>
//                             <Text className = "text-primary-500">Log In </Text>


                    
//                     </Link>
//                 </View>
//             </View>
//         </ScrollView>
//         </TouchableWithoutFeedback>   

//         </KeyboardAvoidingView>

//     )
// }
// export default SignUp


import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputFields";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";
import { icons, images } from "@/constants";

const SignUp = () => {
    const [form, setForm] = useState({
        name: '',
        cid_no: '',
        student_code: '',
        email: '',
        mobile_no: '',
        user_type: '',
        password: '',
        password_confirmation: ''
    });

    const [currentStep, setCurrentStep] = useState(1);

    const onSignUpPress = async () => {
        // Handle the sign-up logic here
    };

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            onSignUpPress();
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
                                        value={form.name}
                                        onChangeText={(value) => setForm({ ...form, name: value })}
                                    />
                                    <InputField
                                        placeholderTextColor="#CCCCCC"
                                        label="CID"
                                        placeholder="CID No"
                                        icon={icons.person}
                                        value={form.cid_no}
                                        onChangeText={(value) => setForm({ ...form, cid_no: value })}
                                    />
                                    <InputField
                                        placeholderTextColor="#CCCCCC"
                                        label="Student Code"
                                        placeholder="Student Code"
                                        icon={icons.person}
                                        value={form.student_code}
                                        onChangeText={(value) => setForm({ ...form, student_code: value })}
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
                                        value={form.email}
                                        onChangeText={(value) => setForm({ ...form, email: value })}
                                    />
                                    <InputField
                                        placeholderTextColor="#CCCCCC"
                                        label="Mobile Number"
                                        placeholder="Mobile Number"
                                        icon={icons.person}
                                        value={form.mobile_no}
                                        onChangeText={(value) => setForm({ ...form, mobile_no: value })}
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
                                        value={form.user_type}
                                        onChangeText={(value) => setForm({ ...form, user_type: value })}
                                    />
                                    <InputField
                                        placeholderTextColor="#CCCCCC"
                                        label="Password"
                                        placeholder="Password"
                                        icon={icons.person}
                                        value={form.password}
                                        onChangeText={(value) => setForm({ ...form, password: value })}
                                    />
                                    <InputField
                                        placeholderTextColor="#CCCCCC"
                                        label="Password Confirmation"
                                        placeholder="Password Confirmation"
                                        icon={icons.person}
                                        value={form.password_confirmation}
                                        onChangeText={(value) => setForm({ ...form, password_confirmation: value })}
                                    />
                                </>
                            )}

                            <View className="flex flex-row items-center justify-center">
                                {currentStep > 1 && (
                                    <CustomButton title="Previous" onPress={previousStep} className="w-1/2" />
                                )}
                                <CustomButton
                                    title={currentStep === 3 ? "Sign Up" : "Next"}
                                    onPress={nextStep}
                                    className={`w-${currentStep > 1 ? '1/2' : 'full'} ml-2`}
                                />
                            </View>

                            {currentStep === 1 && (
                                <Link href="/sign-in" className="text-lg text-left text-general-200 pt-5 -mt-20 mb-10">
                                    <Text>Already Have An Account?</Text>
                                    <Text className="text-primary-500">Log In</Text>
                                </Link>
                            )}
                        </View>

                        {/* Positioning the signUp1 image at the bottom right */}
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

