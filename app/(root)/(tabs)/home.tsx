import CustomButton from "@/components/customButton"
import AuthContext from "@/context/AuthContext"
import { router } from "expo-router"
import { useContext } from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import DashboardBg from "@/components/DashboardBg"

const Home = () =>{
   
    
    return(
        <View className="flex-1">
            <DashboardBg/>
            <Text className="">Book</Text>
            
        </View>
    )
}
export default Home