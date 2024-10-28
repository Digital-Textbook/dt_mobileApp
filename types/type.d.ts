import {TextInputProps, TouchableOpacityProps} from "react-native";
import { ReactNode } from "react";

declare interface ButtonProps extends TouchableOpacityProps {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
    // IconLeft?: React.ComponentType<any>;
    // IconRight?: React.ComponentType<any>;
    IconLeft?: React.ReactElement | ImageSourcePropType; 
    IconRight?: React.ReactElement | ImageSourcePropType; 
    className?: string;
}
declare interface InputFieldProps extends TextInputProps {
    label: string;
    icon?: any;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
    error?: string;
}

declare interface DashboardBgProps {
    children: ReactNode; 
  }
export type HandleInputChange = (text: string, index: number) => void;

