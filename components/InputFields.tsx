import { InputFieldProps } from "@/types/type";
import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  error,
  ...props
}: InputFieldProps) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
    style={{ flex: 1 }} // Ensure the view takes the full screen height
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="my-2 w-full">
        {/* <Text className = {`text-lg font-interSemiBold, mb-3 ${labelStyle}`}>
                    {label}
                </Text> */}

        <View
          className={`flex flex-row justify-start items-center relative bg-[#ffff] rounded-lg border border-[#9FA0A0] focus:border-primary-500 ${containerStyle}`}
        >
          {icon && (
            <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
          )}
          <TextInput
            className={`rounded-full p-4 font-interSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
                {/* Display the error message if present */}
                {error && (
          <Text className="text-red-500 text-sm mt-1">
            {error}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default InputField;
