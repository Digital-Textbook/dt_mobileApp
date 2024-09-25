
// import React from 'react';
// import { SafeAreaView } from 'react-native';
// import PDFViewer from '../../../components/PDFViewer';

// const App: React.FC = () => {
//   const pdfUrl = 'http://localhost:3001/textbook/467b6852-79ef-4e54-9f4c-b38e824f77ad/textbook-details';

//   return (
//     <SafeAreaView className="flex-1">
//       <PDFViewer url={pdfUrl} />
//     </SafeAreaView>
//   );
// };

// export default App;

// import React from 'react';
// import { SafeAreaView, View, Text } from 'react-native';
// import { WebView } from 'react-native-webview';

// const SomeComponent = () => {
//   const pdfUrl = 'http://192.168.101.6:9000/textbook/260KB (1).pdf'; 

//   return (
//     <SafeAreaView className='flex-1 h-full'>
//       <WebView
//         source={{ uri: pdfUrl }}
//         onError={(e) => {
//           console.warn('WebView Error:', e.nativeEvent.description);
//         }}
//         renderLoading={() => <Text className='text-center text-lg mt-4'>Loading PDF...</Text>}
//         startInLoadingState={true}
//       />
//     </SafeAreaView>
//   );
// };

// export default SomeComponent;

import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';

const SomeComponent = () => {
  const [webViewKey, setWebViewKey] = useState(0);
  const pdfUrl = 'http://192.168.92.163:9000/textbook/260KB (1).pdf';
  // const pdfUrl = 'http://172.20.10.7:9000/textbook/260KB (1).pdf';

  useFocusEffect(
    useCallback(() => {
      // Force WebView to reload
      setWebViewKey(prevKey => prevKey + 1);
    }, [])
  );

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1'>
        <WebView
          key={webViewKey} // Key prop to force reload
          source={{ uri: pdfUrl }}
          className='flex-1'
          onError={(e) => {
            console.warn('WebView Error:', e.nativeEvent.description);
          }}
          renderLoading={() => (
            <View className='flex-1 justify-center items-center'>
              <Text className='text-center text-lg mt-4'>Loading PDF...</Text>
            </View>
          )}
          startInLoadingState={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default SomeComponent;

