import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RadioButton = ({ label, value, selectedValue, onSelect }) => {
    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
            onPress={() => onSelect(value)}
        >
            <View
                style={{
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#1E90FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                }}
            >
                {selectedValue === value && (
                    <View
                        style={{
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            backgroundColor: '#1E90FF',
                        }}
                    />
                )}
            </View>
            <Text className='text-black'>{label}</Text>
        </TouchableOpacity>
    );
};

export default RadioButton;
