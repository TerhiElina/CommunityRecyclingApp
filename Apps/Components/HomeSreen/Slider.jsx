import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function Slider({sliderList}) {
   
  
  return (
    <View className="mt-5">
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false} // Tällä saadaan scrollauspalkki pois
        renderItem={({item,index}) => (
            <View>
                <Image source={{uri:item?.image}}
                    className="h-[180px] w-[320px] mr-3 rounded-lg obj-contain"
                />
            </View>
        )}
        />
    </View>
  )
}