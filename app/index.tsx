import { Redirect } from "expo-router"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Main = () =>{
    return <Redirect href="/(auth)/onboarding"/>
}
export default Main