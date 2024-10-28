

// import React, { useState, useCallback } from 'react';
// import { SafeAreaView, View, Text } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { useFocusEffect } from '@react-navigation/native';

// const SomeComponent = () => {
//   const [webViewKey, setWebViewKey] = useState(0);
//   const pdfUrl = 'http://192.168.101.:9000/textbook/260KB (1).pdf';
//   // const pdfUrl = 'http://172.20.10.7:9000/textbook/260KB (1).pdf';

//   useFocusEffect(
//     useCallback(() => {
//       // Force WebView to reload
//       setWebViewKey(prevKey => prevKey + 1);
//     }, [])
//   );

//   return (
//     <SafeAreaView className='flex-1'>
//       <View className='flex-1'>
//         <WebView
//           key={webViewKey} // Key prop to force reload
//           source={{ uri: pdfUrl }}
//           className='flex-1'
//           onError={(e) => {
//             console.warn('WebView Error:', e.nativeEvent.description);
//           }}
//           renderLoading={() => (
//             <View className='flex-1 justify-center items-center'>
//               <Text className='text-center text-lg mt-4'>Loading PDF...</Text>
//             </View>
//           )}
//           startInLoadingState={true}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SomeComponent;

import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import { getFileUrl } from '../../../services/api/minIOClient'

const SomeComponent = () => {
  const [webViewKey, setWebViewKey] = useState(0);

  // Generate the full URL for the PDF
  const pdfUrl = getFileUrl('textbook/260KB (1).pdf');

  useFocusEffect(
    useCallback(() => {
      // Force WebView to reload when focused
      setWebViewKey(prevKey => prevKey + 1);
    }, [])
  );

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1'>
        <WebView
          key={webViewKey}
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
