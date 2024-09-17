// components/PDFViewer.tsx
import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'expo-web-browser'; 
import getPDF from '../services/api/books/Book';

interface PDFViewerProps {
  url: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const pdfData = await getPDF(url);
        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        const pdfUri = URL.createObjectURL(pdfBlob);
        setPdfUri(pdfUri);
        setLoading(false);
      } catch (error) {
        Alert.alert('Error', error.message);
        setLoading(false);
      }
    };

    fetchPDF();
  }, [url]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      {pdfUri ? (
        <WebView
          source={{ uri: pdfUri }}
          style={{ flex: 1 }}
          scalesPageToFit={true}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text>No PDF available</Text>
        </View>
      )}
    </View>
  );
};

export default PDFViewer;
