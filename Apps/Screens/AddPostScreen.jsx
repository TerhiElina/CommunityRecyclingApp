import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import {useEffect, useState}from 'react'
import { addDoc, collection, getDocs, getFirestore} from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export default function AddPostScreen() {
  
  const db = getFirestore(app);
  const storage = getStorage();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    getCategoryList();
  },[])

  // Saadaan categorylist
  const getCategoryList = async() => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    console.log("Query snapshot:", querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log("Docs: ", doc.data());
      setCategoryList(categoryList => [...categoryList,doc.data()])
    })

  }
  //Käytetään kuvan valintaan galleriasta
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  //Asetetaan kuva
  const onSubmitMethod = async (value) =>{
    //Lisätään loading 
    setLoading(true);

  //Muokataan uri muotoinen kuva blob fileksi, jonka voi viedä fireStoreen
  //Lisäksi muokataan url muotoon, joka voidaan välittä firestoragesta tietokantaan
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, 'RecyclingPost/'+Date.now()+".jpg"); // RecyclingPost on kansio, johon firestoressa tallennetaan

    uploadBytes(storageRef, blob).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    }).then((resp) =>{
      getDownloadURL(storageRef).then(async(downloadUrl) => {
       console.log(downloadUrl); 
       value.image=downloadUrl;

       //Lisätään documentti tietokantaan/collectioniin
       const docRef = await addDoc(collection(db,"UserPost"),value)
       if (docRef.id){
        setLoading(false);
        //Lisätään ilmoitun julkaisun onnistumisesta
        Alert.alert('Julkaisu onnistunut!')
       }
      })
    });

  }
  //Formin muotoiluun käytetään formikia, jonka avulla on helppo muotoilla
  //formin ulkoasua.
  return (
   <KeyboardAvoidingView> 
        {/*KeyboardAvoidingViewn avulla valittu input field näkyy keyboardin yläpuolella */}

    <ScrollView>
    <View className="p-10 flex-1">
      <Text className="text-[27px] font-bold text-red-400">Lisää uusi ilmoitus</Text>
      <Text  className="text-[18px] text-gray-700 mb-7">Täytä tuotteen tiedot ja laita hyvä kiertämään.</Text>
      <Formik
        initialValues={{title:'' ,desc:'' ,category:'' ,address:'' ,price:'' ,image:''}} //, createdAt:Date.now
        onSubmit={value=>onSubmitMethod(value)}
        //Lisätään validointi, joka tarkistaa annetut kentät
        //jos kenttä on tyhjä, onSubmitia ei kutsuta ja annetaan error-viesti
        //
        validate={(values) =>{
          const errors = {}
          if(!values.title){
            console.log("Title not present")
            ToastAndroid.show('Otsikko puuttuu', ToastAndroid.SHORT)
            errors.name="Otsikko puuttuu"
          }
          return errors
        }}
      >
        {({handleChange, handleBlur, handleSubmit, values, setFieldValue, errors})=>(
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image?
              <Image source={{uri:image}} style={{width:100, height:100, borderRadius:15}} />
              :
              <Image source={require('../../assets/images/placeholdercolor.jpg')}
                style={{width:100, height:100, borderRadius:15}}
                
                />}
            </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder='Otsikko'
            value={values?.title}
            onChangeText={handleChange('title')}
          />
            
          <TextInput
            style={styles.input}
            placeholder='Kuvaus'
            value={values?.desc}
            numberOfLines={5}
            onChangeText={handleChange('desc')}
          />
          <TextInput
            style={styles.input}
            placeholder='Hinta'
            value={values?.price}
            onChangeText={handleChange('price')}
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            placeholder='Osoite'
            value={values?.address}
            onChangeText={handleChange('address')}
          />
          {/*Lisätään Category listalle drop down */}
          <View style={{borderWidth:1, borderRadius:10, marginTop:15}}>
          <Picker
            selectedValue={values?.category}
            className="border-2"
            onValueChange={itemValue=>setFieldValue('category', itemValue)}
          >
            {/*Katsotaan onko Categorylistiä olemassa ja mapataan se */}
            {categoryList.length > 0 && categoryList.map((item, index) =>(
              <Picker.Item key={index}
              label={item?.name} value={item?.name} />
            ))}
          </Picker>
          </View>
            <TouchableOpacity onPress={handleSubmit}
              style={{
                backgroundColor: loading?'#ccc' : '#fc8181'
              }}
              disabled={loading}
              className="p-4 bg-red-400 rounded-full mt-10">
              {loading?
                <ActivityIndicator color='#fff'/>
                :
                <Text className="text-white text-center text-[16px] font-bold">Tallenna</Text>
              }
              </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
    </ScrollView>
    </KeyboardAvoidingView> 
  )
}

const styles = StyleSheet.create({
  input:{
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop: 15,
    marginBottom: 5,
    marginTop:10,
    paddingHorizontal:20,
    textAlignVertical:'top',
    fontSize: 15,

  }
})