import { View, Text, Image, Share} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ProductDetail({navigation}) {

    const {params} = useRoute();
    const [product, setProduct] = useState([]);
    useEffect(() =>{
        //console.log(params)
        setProduct(params.product);
        params&&setProduct(params.product);
        shareButton();
    },[params,navigation])

    const shareButton=()=> {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={()=>shareProduct()}>
                    <Ionicons name="share-social-sharp" size={24} color="white"
                     style={{marginRight:15}}/>
                </TouchableOpacity>            
        ),
          });

        }
    //Rakennetaan share toiminnallisuus
    const shareProduct=async() =>{
        const content = {
            message:product.title+"\n"+product.desc,

        }
        Share.share(content).then(resp=>{
        console.log(resp);
        }, (error) =>{
            console.log(error)
        })
        
    }
    
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
        <View>
            <Text>{product.userEmail}</Text>
        </View>
        {/*Tähän tulee "myyjän" tiedot, kunhan saan käyttäjätietojen välittämisen toimimaan*/}
        
    </View>
  )
}
