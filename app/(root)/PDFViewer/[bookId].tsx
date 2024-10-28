import { useLocalSearchParams } from "expo-router";
import { SafeAreaView} from "react-native-safe-area-context";
import { Text } from "react-native";
import PDFViewer from "@/components/PDFViewer";

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
            <PDFViewer id={bookId} />
        </SafeAreaView>
    );
};

export default Page;
