// ForgotPassword.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground,Image} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButton from '@/components/customButton';
import InputFields from '@/components/InputFields';
import { icons, images } from '@/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';

// Define validation schema with Yup
const schema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
}).required();

interface FormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema),
        
    });
    const router = useRouter(); // Get router object


    const onSubmit = (data: FormData) => {
        // Handle forgot password logic here
        Alert.alert('Reset Link Sent', `A reset link has been sent to ${data.email}`);
        // Implement your API call here
    };

    return (
        <ImageBackground
            source={images.otpBg} 
            className='flex-1 w-full h-full'
            resizeMode='cover'
        >
        <TouchableOpacity 
        // onPress={() => navigation.goBack()}
        onPress={() => router.push('/sign-in')}
        className="w-full flex justify-start items-start pt-14 pl-5"
        >
        <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

            <View className='flex-1 justify-center px-4 pt-10'>
                <View className="relative w-full h-[250px]">
                    <Image source={images.reset} className="z-0 w-full h-[300px]" />
                </View>

                <Text className='text-2xl font-bold mb-2 pt-10 text-center'>Reset Password</Text>
                <Text className='text-lg mb-6 text-center'>Please provide the email address that you used when you signed up for the account.</Text>

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputFields
                            placeholderTextColor="#CCCCCC"
                            label="Email"
                            placeholder="Email"
                            onBlur={onBlur}
                            icon={icons.person}
                            onChangeText={onChange}
                            value={value}
                            error={errors.email?.message}
                        />
                    )}
                />
                {errors.email && <Text className='text-red-500 mb-4'>{errors.email.message}</Text>}

                
                <View className="w-full bottom-44">
                    <CustomButton
                        title="Reset Password"
                        onPress={handleSubmit(onSubmit)}
                        className='w-full'
                    />
                </View>
                
            </View>
        </ImageBackground>
    );
};

export default ForgotPassword;
