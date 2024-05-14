import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Categories({categoryList}) {

const navigation = useNavigation();

  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Categoriat</Text>
      <FlatList 
        data={categoryList}
        numColumns={4}
        renderItem={({item, index})=>(
          <TouchableOpacity
            onPress={()=>navigation.navigate('item-list', {
              category: item.name
            })}
            className="flex-1 items-center justify-center
            p-2 border-[2px] border-red-300 m-1 h-[80px] rounded-lg bg-white">
            <Image source={{uri:item.icon}}
            className="w-[40px] h-[40px] p-2 border-[1px]"
            />
            <Text className="text-[11px] mt-1">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}