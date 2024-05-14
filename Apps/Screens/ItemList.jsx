import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeSreen/LatestItemList';

export default function ItemList() {

  //Haetaan tiettyyn kategoriaan kuuluvat tuotteet
  const {params} = useRoute();
  const db = getFirestore(app);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);

  //Ajetaan, vain kun params arvo on paikalla
  useEffect(()=>{
    //console.log(params.category)
    params&&getItemListByCategory();
  },[params])

  // Luodaan query, jossa haetaan yhteys tietokantaan(collectioniin UserPost)
  //Määritellään mihin fieldiin(category)
  const getItemListByCategory = async ()=>{
    setItemList([]);
    setLoading(true)
    const q = query(collection(db,'UserPost'),where('category','==', params.category));
    const snapShot = await getDocs(q);
    setLoading(false) // Tämän avulla saadaan näkyviin teksti, vaikka categorialla ei ole postauksia
    //ForEachin avulla kerrotaan mitä tietoa printataan
    snapShot.forEach(doc=>{
      console.log(doc.data());
      setItemList(itemList =>[...itemList,doc.data()]);
      setLoading(false)
    })
  }
 /*Jos kategoria löytyy näytetään latestItemList muuten teksti */
  return (
    <View className="p-2">
      {loading?
        <ActivityIndicator size={'large'} color={'#000'} />
        : 
      itemList?.length>0? <LatestItemList latestItemList={itemList}
        heading={''} />
        :
        <Text className="p-5 justify-center text-center mt-24 text-[18px] text-gray-400 ">Tällä kategorialla ei löytynyt tuotteita</Text>
      }
      </View>
)
}