import { View, Text, ActivityIndicator, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ReaderProvider, Reader, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system'; // for Expo project
import { useEffect, useState } from "react";

const EPUBViewer = ({ id }) => {
    const { goToLocation } = useReader();
    const [pdfUri, setPdfUri] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const uri = `http://192.168.92.163:9000/textbook/${id}.epub`;
                // const uri = `http://192.168.101.17:9000/textbook/${id}.pdf`;
                // const uri = `http://172.20.10.7:9000/textbook/${id}.pdf`;
                console.log('Fetching PDF from:', uri);

                if (!uri) {
                    throw new Error('PDF URL is invalid');
                }

                setPdfUri(uri);
            } catch (error) {
                console.error('Failed to fetch PDF:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchPdf();
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        Alert.alert('Error', 'Failed to load PDF');
        return <Text>Failed to load PDF</Text>;
    }

    if (!pdfUri) {
        return <Text>No PDF available</Text>;
    }

    return (
        <ReaderProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <Reader
                    src={pdfUri}
                    fileSystem={useFileSystem}
                />
            </SafeAreaView>
        </ReaderProvider>
    )
}
export default EPUBViewer