import { View, Text } from 'react-native'
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

  //Ajetaan, vain kun params arvo on paikalla
  useEffect(()=>{
    //console.log(params.category)
    params&&getItemListByCategory();
  },[params])

  // Luodaan query, jossa haetaan yhteys tietokantaan(collectioniin UserPost)
  //Määritellään mihin fieldiin(category)
  const getItemListByCategory = async ()=>{
    setItemList([]);
    const q = query(collection(db,'UserPost'),where('category','==', params.category));
    const snapShot = await getDocs(q);
    //ForEachin avulla kerrotaan mitä tietoa printataan
    snapShot.forEach(doc=>{
      console.log(doc.data());
      setItemList(itemList =>[...itemList,doc.data()]);
    })
  }

  return (
    <View className="p-2">
      {/*Jos kategoria löytyy näytetään latestItemList muuten teksti */}
      {itemList?.length>0? <LatestItemList latestItemList={itemList}
        heading={''} /> :
        <Text className="p-5 justify-center text-center mt-24 text-[18px] text-gray-400 ">Tällä kategorialla ei löytynyt tuotteita</Text> }
    </View>
  )
}