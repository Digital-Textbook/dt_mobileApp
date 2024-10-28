// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator, Text, Alert } from 'react-native';
// import { WebView } from 'react-native-webview';

// const PDFViewer = ({ id }) => {
//   const [pdfUri, setPdfUri] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchPdf = async () => {
//       try {
//         // const uri = `http://192.168.92.163:9000/textbook/${id}.pdf`;
//         const uri = `http://192.168.101.28:9000/textbook/${id}.pdf`;
//         // const uri = `http://172.20.10.7:9000/textbook/${id}.pdf`;
//         console.log('Fetching PDF from:', uri);

//         if (!uri) {
//           throw new Error('PDF URL is invalid');
//         }

//         setPdfUri(uri);
//       } catch (error) {
//         console.error('Failed to fetch PDF:', error);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPdf();
//   }, [id]);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (error) {
//     Alert.alert('Error', 'Failed to load PDF');
//     return <Text>Failed to load PDF</Text>;
//   }

//   if (!pdfUri) {
//     return <Text>No PDF available</Text>;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         source={{ uri: pdfUri }}
//         style={{ flex: 1 }}
//         renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
//         startInLoadingState={true}
//         onError={(e) => {
//           console.error('WebView Error:', e.nativeEvent);
//           Alert.alert('Error', 'Failed to load PDF');
//         }}
//       />
//     </View>
//   );
// };

// export default PDFViewer;


import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import apiClient from '../services/api/apiClient'; 
import { fetchTextbookDetails } from '@/services/api/books/Book';
import { getFileUrl } from '@/services/api/minIOClient';

const PDFViewer = ({ id }) => {
  const [pdfUri, setPdfUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetchTextbookDetails(id);
        const pdfUrl = getFileUrl(response.textbookUrl.replace('localhost:9000/', ''));
        setPdfUri(pdfUrl);
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
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: pdfUri }}
        style={{ flex: 1 }}
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
        startInLoadingState={true}
        onError={(e) => {
          console.error('WebView Error:', e.nativeEvent);
          Alert.alert('Error', 'Failed to load PDF');
        }}
      />
    </View>
  );
};

export default PDFViewer;
