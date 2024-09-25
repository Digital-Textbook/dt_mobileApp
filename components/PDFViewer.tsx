// import React from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
// import useFetchPDF from '../app/(root)/(tabs)/hooks/useFetchPDF'; // Adjust the path as needed

// type PDFViewerProps = {
//   id: string; // Ensure that `id` is a required prop
// };

// const PDFViewer: React.FC<PDFViewerProps> = ({ id }) => {
//   // Ensure `id` is defined
//   if (!id) {
//     return (
//       <View style={styles.container}>
//         <Text>ID is required</Text>
//       </View>
//     );
//   }

//   const { pdfUrl, loading, error } = useFetchPDF(id);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <WebView
//       source={{ uri: pdfUrl || '' }}
//       style={styles.webview}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   webview: {
//     flex: 1,
//   },
// });

// export default PDFViewer;

// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator, Text, Alert } from 'react-native';
// import { WebView } from 'react-native-webview'; // Using WebView for direct display

// const PDFViewer = ({ id }) => {
//   const [pdfUri, setPdfUri] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchPdf = async () => {
//       try {
//         const uri = `http://192.168.101.6:9000/textbook/${id}.pdf`; // Replace with your IP address
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

const PDFViewer = ({ id }) => {
  const [pdfUri, setPdfUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const uri = `http://192.168.92.163:9000/textbook/${id}.pdf`;
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
