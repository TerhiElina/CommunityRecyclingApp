import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/HomeSreen/Header";
import Slider from "../Components/HomeSreen/Slider";
import { collection, doc, getDocs, getFirestore, orderBy } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import Categories from "../Components/HomeSreen/Categories";
import LatestItemList from "../Components/HomeSreen/LatestItemList";


export default function HomeScreen({ user }){

    const db = getFirestore(app);
    const [sliderList, setSliderList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [latestItemList, setLatestItemList] = useState([]);
    useEffect(() =>{
        getSliders();
        getCategoryList();
        getLatestItemList();
    }, [])
    //user
    //Haetaan collection slideriä varten
    const getSliders = async () =>{
        // Alustetaan sliderList state tyhjäksi, ettei se lisää joka 
        //renderöinnillä listan perään uusia itemeitä. Näytetään siis ainoastaan itemit, jotka
        //on tallennettu firestoreen
        setSliderList([]);
        const querySnapshot = await getDocs(collection(db,"Sliders"));
        querySnapshot.forEach((doc) => {
            //console.log(doc.id, "=>", doc.data());
            //Asetetaan haetut kuvat sliderList stateen
            setSliderList(sliderList => [...sliderList,doc.data()]);
        });

    }

    // Haetaan categolyList
  const getCategoryList = async() => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    console.log("Query snapshot:", querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log("Docs: ", doc.data());
      setCategoryList(categoryList => [...categoryList,doc.data()])
    })

  }
  const getLatestItemList = async() => {
    setLatestItemList([]);
    const querySnapshot = await getDocs(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
    querySnapshot.forEach((doc) => {
        console.log("Docs: ", doc.data());
        setLatestItemList(latestItemList => [...latestItemList,doc.data()])
    })
  }
    
    return(
       
        <ScrollView className="py-8 px-6 flex-1 bg-white">
            {/*Lisätään user headeriin, joka välittää käyttäjän tiedot headerille */}
            <Header />
            {/*Renderöidään slider komponentti ja välitetään sen avulla sliderList */}
            <Slider sliderList={sliderList} />
            <Categories categoryList={categoryList} />
            <LatestItemList latestItemList ={latestItemList}
              heading={'Viimeksi lisätyt'}
            />
        </ScrollView>
    )
}