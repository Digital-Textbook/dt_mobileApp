import EPUBViewer from "@/components/EPUBViewer"
import { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"

const Bookmark = () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <EPUBViewer id="260KB" /> */}
        </SafeAreaView>
    )
}
export default Bookmark

// import React, { useState, useEffect } from "react";
// import { SafeAreaView, FlatList, Text, View, ActivityIndicator } from "react-native";
// import axios from "axios"; // Assuming you are using axios for API requests

// const Bookmark = () => {
//     const [books, setBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch list of books
//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await axios.get("https://api.example.com/books"); // Replace with your API URL
//                 setBooks(response.data);
//             } catch (error) {
//                 setError('Failed to fetch books');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBooks();
//     }, []);

//     // Render book items
//     const renderBookItem = ({ item }) => (
//         <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
//             <Text style={{ fontSize: 18 }}>{item.title}</Text>
//             <Text style={{ color: "#555" }}>{item.author}</Text>
//         </View>
//     );

//     if (loading) {
//         return (
//             <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </SafeAreaView>
//         );
//     }

//     if (error) {
//         return (
//             <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//                 <Text>{error}</Text>
//             </SafeAreaView>
//         );
//     }

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <FlatList
//                 data={books}
//                 keyExtractor={(item) => item.id.toString()} // Ensure each book has a unique id
//                 renderItem={renderBookItem}
//             />
//         </SafeAreaView>
//     );
// };

// export default Bookmark;
