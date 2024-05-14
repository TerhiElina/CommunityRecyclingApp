import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


//Luodaan PostItem komponentti, jotta sitä voi
//käyttää useassa paikassa
export default function PostItem({item}) {
  
  const navigation = useNavigation({item});
  
  return (
    <TouchableOpacity className="flex-1 m-2 p-2 border-[1px]
     border-slate-200 bg-gray-50 rounded-lg "
     onPress={()=>navigation.push('product-detail',
      {
        product:item
      })}
    >
            <Image source={{uri:item.image}}
              className="w-full h-[140px] rounded-lg"/>
              <View className="mt-2">
                <Text className="text-red-400 p-1 mt-1">{item.category}</Text>
                <Text className="text-[15px] font-bold">{item.title}</Text>
                <Text className="text-[20px] font-bold text-red-400">{item.price} €</Text>
              </View>
          </TouchableOpacity>
  )
}