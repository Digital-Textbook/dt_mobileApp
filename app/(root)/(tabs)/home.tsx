import CustomButton from "@/components/customButton"
import AuthContext from "@/context/AuthContext"
import { router } from "expo-router"
import { useContext } from "react"
import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Home = () =>{
    const { logout } = useContext(AuthContext);
    
    return(
        <SafeAreaView>
            <Text className="">Book</Text>
            <CustomButton
                title="Log Out"
                onPress={()=> {
                    logout();
                    router.replace("/(auth)/users/sign-in");
                }}
                className='w-full mt-1'
            />
        </SafeAreaView>
    )
}
export default Home