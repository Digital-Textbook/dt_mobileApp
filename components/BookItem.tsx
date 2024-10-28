// components/BookItem.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface BookItemProps {
  id: string;
  author: string;
  coverUrl: string;
  subjectName: string;
  onPress: () => void;
}

const BookItem: React.FC<BookItemProps> = ({ author, coverUrl, subjectName, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="m-2 w-28">
      <View className="border border-gray-300 rounded-lg p-4 items-center">
        <Image source={{ uri: `http://${coverUrl}` }} className="w-24 h-36 rounded" />
        <Text className="text-lg font-semibold mt-2">{subjectName}</Text>
        <Text className="text-gray-500">{author}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BookItem;
