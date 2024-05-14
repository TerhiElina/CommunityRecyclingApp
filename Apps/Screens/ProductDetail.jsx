import { View, Text, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

export default function ProductDetail() {

    const {params} = useRoute();
    const [product, setProduct] = useState([]);
    useEffect(() =>{
        //console.log(params)
        setProduct(params.product);
        params&&setProduct(params.product);
    },[params])
  return (
    <View>
        <Image source={{uri: product.image}}
        className="h-[320px] w-full"
        />
        <View className="p-3">
           <Text className="text-[24px] font-bold">{product?.title}</Text>
                <View className="items-baseline">
                    <Text className="p-1 px-2 mt-2 rounded-full bg-red-200 text-red-400">{product.category}</Text>
                </View>
            <Text className="mt-3 font-bold text-[20px]">Kuvaus</Text> 
            <Text className="text-[16px] text-gray-500 ">{product?.desc}</Text> 
        </View>
        {/*User info*/}
        <View>
            <Image source={{uri:product.userImage}}
                className="w-12 h-12" />
        </View>
    </View>
  )
}
