// import { View, Text } from "react-native"
// import { SafeAreaView } from "react-native-safe-area-context"

// const Book = () =>{
//     return(
//         <SafeAreaView>
//             <Text className="">Book</Text>
//         </SafeAreaView>
//     )
// }
// export default Book

// App.tsx
import React from 'react';
import { SafeAreaView } from 'react-native';
import PDFViewer from '../../../components/PDFViewer';

const App: React.FC = () => {
  const pdfUrl = 'http://localhost:3001/textbook/467b6852-79ef-4e54-9f4c-b38e824f77ad/textbook-details';

  return (
    <SafeAreaView className="flex-1">
      <PDFViewer url={pdfUrl} />
    </SafeAreaView>
  );
};

export default App;
