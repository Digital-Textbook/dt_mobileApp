// // components/BooksList.tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { Href, useRouter } from 'expo-router';
// import { fetchTextbooks } from '@/services/api/books/booklist';

// const BooksList = () => {
//   const router = useRouter();
//   const [books, setBooks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch books on component mount
//   useEffect(() => {
//     const getBooks = async () => {
//       try {
//         const fetchedBooks = await fetchTextbooks();
//         setBooks(fetchedBooks);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getBooks();
//   }, []);

//  // Handle book item press
// const handleBookPress = (bookId: string, isEpub: boolean) => {
//     // Using a template literal for dynamic routing
//     const viewerPath = isEpub ? `/EPUBViewer?bookId=${bookId}` : `/PDFViewer?bookId=${bookId}`;
//     router.push(viewerPath as Href); // Cast the path as Href type
//   };
  

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <View className="p-4">
//       {books.map((book) => (
//         <TouchableOpacity
//           key={book.id}
//           onPress={() => handleBookPress(book.id, book.textbookUrl.endsWith('.epub'))}
//           className="flex-row items-center mb-4 p-2 border border-gray-200 rounded"
//         >
//           <Image
//             source={{ uri: book.coverUrl }}
//             className="w-16 h-24 mr-4"
//             resizeMode="cover"
//           />
//           <View>
//             <Text className="text-lg font-semibold">{book.author}</Text>
//             <Text className="text-sm">{book.subjectName}</Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// export default BooksList;

// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { Href, useRouter } from 'expo-router';
// import { fetchTextbooks } from '@/services/api/books/booklist';

// const BooksList = () => {
//   const router = useRouter();
//   const [books, setBooks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch books on component mount
//   useEffect(() => {
//     const getBooks = async () => {
//       try {
//         const fetchedBooks = await fetchTextbooks();
//         console.log('Fetched Books:', fetchedBooks); 
//         setBooks(fetchedBooks);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getBooks();
//   }, []);

//   // Handle book item press
//   const handleBookPress = (bookId: string, isEpub: boolean) => {
//     const viewerPath = isEpub ? `/EPUBViewer?bookId=${bookId}` : `/PDFViewer?bookId=${bookId}`;
//     router.push(viewerPath as Href);
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (books.length === 0) {
//     return (
//       <View className="p-4">
//         <Text>No books available.</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="p-4">
//       {books.map((book) => (
//         <TouchableOpacity
//           key={book.id}
//           onPress={() => handleBookPress(book.id, book.textbookUrl.endsWith('.epub'))}
//           className="flex-row items-center mb-4 p-2 border border-gray-200 rounded"
//         >
//           <Image
//             source={{ uri: book.coverUrl.startsWith('http') ? book.coverUrl : `http://${book.coverUrl}` }} 
//             className="w-16 h-24 mr-4"
//             resizeMode="cover"
//           />
//           <View>
//             <Text className="text-lg font-semibold">{book.author}</Text>
//             <Text className="text-sm">{book.subjectName}</Text>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// export default BooksList;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { fetchTextbooks } from '@/services/api/books/booklist';
import Icon from 'react-native-vector-icons/Ionicons';

const BooksList = () => {
  const router = useRouter();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch books on component mount
  useEffect(() => {
    const getBooks = async () => {
      try {
        const fetchedBooks = await fetchTextbooks();
        console.log('Fetched Books:', fetchedBooks); 
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error fetching books:', error); 
      } finally {
        console.log('Finished loading books');
        setLoading(false); 
      }
    };

    getBooks();
  }, []);

  // Handle book item press
  const handleBookPress = (bookId: string, isEpub: boolean) => {
    console.log(`Navigating to bookId: ${bookId}, isEpub: ${isEpub}`); 
    const viewerPath = isEpub ? `/EPUBViewer/${bookId}` : `/PDFViewer/${bookId}`;
    router.push(viewerPath as Href);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (books.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <Text>No books available.</Text>
      </View>
    );
  }

  // Render the book list
  return (
    <View>
     <View className="pl-3 pr-3">
        <Text className="text-lg font-interSemiBold mb-2">Find your book</Text>

       <View className="relative w-full mt-0">
          <Icon
            name="search"
            size={20}
            color="grey"
            style={{ position: 'absolute', left: 10, top: '50%', transform: [{ translateY: -10 }] }}
          />
        <TextInput
          placeholder="Search books..."
          placeholderTextColor="grey"
          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
        />
      </View>
    </View>
    <View className='pt-2 pl-3 flex-row items-center'>
      <Text className='font-interBold text-xl'>
        Text Books
     
      <TouchableOpacity onPress={() => router.push('/all-books')} className='gap-x-48'>
        <Text className="text-blue-500">
          See All
        </Text>
      </TouchableOpacity>
      </Text>
    </View>
      
    <View style={{ padding: 14, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
      
      {books.map((book) => (
        <TouchableOpacity
          key={book.id}
          onPress={() => handleBookPress(book.id, book.textbookUrl.endsWith('.epub'))}
          style={{
            alignItems: 'left',
            marginBottom: 16,
            // padding:10,
            borderColor: '#e5e7eb',
            backgroundColor:'white',
            height:250,
            borderWidth: 1,
            borderRadius: 7,
          }}
        >
          <Image
            source={{ uri: book.coverUrl.startsWith('http') ? book.coverUrl : `http://${book.coverUrl}`.replace('localhost','192.168.101.23') }}
            style={{ width: 165, height: 150, borderTopLeftRadius: 7, borderTopRightRadius:7}}
            resizeMode="cover"
          />
          <View className='pt-3 p-3'>
            
            <Text style={{ fontSize: 18, fontWeight: '600',paddingBottom:5}}>{book.subjectName}</Text>
            <Text style={{ fontSize: 14 }}>{book.author}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
    </View>
  );
};


export default BooksList;
