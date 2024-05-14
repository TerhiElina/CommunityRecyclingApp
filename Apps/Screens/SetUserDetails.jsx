import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import {useEffect, useState}from 'react'
import { addDoc, collection, getDocs, getFirestore} from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';

const SetUserDetails = () => {
    const db = getFirestore(app);
    const storage = getStorage();
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    //const navigation = useNavigation();

    useEffect(() =>{
        getUsername();
      },[])
    
      // Saadaan categorylist
      const getUsername = async() => {
        setUsername([]);
        const querySnapshot = await getDocs(collection(db, 'users'));
        console.log("Query snapshot:", querySnapshot);
        querySnapshot.forEach((doc) => {
          console.log("Docs: ", doc.data());
          setUsername(username => [...username,doc.data()])
        })
    
      }
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
        const storageRef = ref(storage, 'RecyclingUsers/'+Date.now()+".jpg"); // RecyclingPost on kansio, johon firestoressa tallennetaan
    
        uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        }).then((resp) =>{
          getDownloadURL(storageRef).then(async(downloadUrl) => {
           console.log(downloadUrl); 
           value.image=downloadUrl;
    
           //Lisätään documentti tietokantaan/collectioniin
           const docRef = await addDoc(collection(db,"users"),value)
           if (docRef.id){
            setLoading(false);
            navigation.navigate('AuthenticatedScreen');
            
            //Lisätään ilmoitun julkaisun onnistumisesta
            Alert.alert('Tiedot tallennettu!')
           }
          })
        });
    
      }

      return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Lisää profiilitiedot</Text>
                    <Formik
                        initialValues={{ username: '', image: '' }}
                        onSubmit={onSubmitMethod}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
                            <View>
                                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                                    {image ? (
                                        <Image source={{ uri: image }} style={styles.image} />
                                    ) : (
                                        <Image
                                            source={require('../../assets/images/placeholdercolor.jpg')}
                                            style={styles.image}
                                        />
                                    )}
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Käyttäjänimi"
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                />
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={[styles.button, { backgroundColor: loading ? '#ccc' : '#fc8181' }]}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.buttonText}>Tallenna</Text>
                                    )}
                                </TouchableOpacity>
                                
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },
    button: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default SetUserDetails;