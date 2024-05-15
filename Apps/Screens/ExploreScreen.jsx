import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemList from '../Components/HomeSreen/LatestItemList'
import { ScrollView } from 'react-native-gesture-handler'

export default function ExploreScreen() {

  const db = getFirestore(app)
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getAllProducts();
  },[])
  const getAllProducts=async()=>{
    //Haetaa kaikki tuotteet
    setProductList([]);
    const q = query(collection(db, 'UserPost'),orderBy('createdAt','desc'))
  
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      //console.log("LÖYTYYKÖ TÄMÄ" + doc.data() )
      setProductList(productList =>[...productList,doc.data()]);
    })
  }

  

  return (
    <ScrollView className="p-5 py-8">
      <Text className="text-[30px] font-bold">Kaikki tuotteet</Text>
      <LatestItemList latestItemList={productList} /> 
    </ScrollView>
  )
}