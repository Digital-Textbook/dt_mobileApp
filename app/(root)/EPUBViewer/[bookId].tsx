// import EPUBViewer from "@/components/EPUBViewer";
// import { useLocalSearchParams } from "expo-router";
// import { useEffect } from "react";

// import { SafeAreaView } from "react-native-safe-area-context"

// const Page = () => {
//     const {bookId,textbookUrl} = useLocalSearchParams()
    

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <EPUBViewer id={bookId} textbookUrl={textbookUrl}/>

//         </SafeAreaView>
//     )
// }
// export default Page


import EPUBViewer from "@/components/EPUBViewer";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView} from "react-native-safe-area-context";
import { Text } from "react-native";

const Page = () => {
    const { bookId } = useLocalSearchParams();

    // Conditional rendering if bookId or textbookUrl are missing
    if (!bookId) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Missing book information. Please try again.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <EPUBViewer id={bookId} />
        </SafeAreaView>
    );
};

export default Page;
