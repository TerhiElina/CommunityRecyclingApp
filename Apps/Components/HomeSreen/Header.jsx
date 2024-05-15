import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function Header({user}) {
    
  return (
    
        //Käyttäjän tiedot (Tämä koodi ei toimi vielä, täytyy korjata!
        <View className="items-center gap-2">
            {/**search bar */}
            <View className="p-2 px-5 mt-5 flex flex-row items-center gap-2 bg-gray-100 mat-5 rounded-full w-80 border-[2px] border-gray-200">
                <AntDesign name="search1" size={24} color="black" />
                <TextInput placeholder='Search'
                className="ml-2 text-[16px] p-1"
                onChangeText={(value) => console.log(value)}/>
            </View>
         </View>
        
    
  )
}