import { Button, View, Text, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import TabNavigation from './Navigation/TabNavigation';
import { app } from '../../firebaseConfig';
import AuthenticatedScreen from './AuthenticatedScreen';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getFirestore, getDoc } from 'firebase/firestore';


const AuthScreen = ({email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication}) => {
  
  
    return (
      <KeyboardAvoidingView>
        <ScrollView>
      <Image source={require('./../../assets/images/loginpic.jpg')}
            className="w-full h-96 object-cover" />

    <View className="p-8 bg-white mt-[-20px] rounded-t-3xl">
        <Text className="text-[30px] font-bold">Kierrätys</Text>
        <Text className="text-[20px] text-slate-500 mt-6 mb-6 ">Kierrätä talonyhtiön, työpaikan tai vaikka ystävien kesken!</Text>
        <TextInput
            className="border-[1px] border-gray-500 rounded-lg p-2 mb-2"
            value={email}
            onChangeText={setEmail}
            placeholder='Sähköposti'
            autoCapitalize='none'
        />
        <TextInput
            className="border-[1px] border-gray-500 rounded-lg p-2 mb-3"
            value={password}
            onChangeText={setPassword}
            placeholder='Salasana'
            secureTextEntry
        />
        <View>
          <TouchableOpacity className="rounded-full w-40 mb-8">
            <Button title={isLogin ? 'Kirjaudu' : 'Rekisteröidy'} onPress={handleAuthentication} />       
          </TouchableOpacity>
        </View>
        {/*Tähän tulee styleksi buttoncontainer */}
        <View>
          <Text className="text-[16px]" onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Vai oletko uusi käyttäjä? Rekisteröidy' : 'Onko sinulla jo tili? Kirjaudu'}
            </Text> 
        </View>  
    </View>
    </ScrollView>
  </KeyboardAvoidingView> 
  )
}

  export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // Tämän avulla trackataan, onko käyttäjä kirjautunut
    const [isLogin, setIsLogin] = useState(true);

    const navigation = useNavigation();
    const auth = getAuth(app);

  const getUserDocument = async (uid) => {
    const firestore = getFirestore();
    const userRef = doc(firestore, 'users', uid);
    const userDoc = await getDoc(userRef);
    return userDoc;
  };

    useEffect(() =>{
      const unsubscribe = onAuthStateChanged(auth, async (user) =>{
        if (user) {
          setUser(user);

          //Tarkistetaan onko käyttäjätiedot asetettu
          const userDoc = await getUserDocument(user.uid); //Saadaan user firestoresta
          if(!userDoc.exists || !userDoc.data().username || !userDoc.data().profilePicture) {
            navigation.navigate('SetUserDetails');
          }
        } else {
          setUser(null);
        }
    });
    //Puhdistetaan subscription
    return () => unsubscribe();
    }, [auth, navigation]);

    const handleAuthentication = async () => {
      try {
        // jos käyttäjä on kirjautunut, näytetään signout
        if (user) {
          console.log("user sign in successful")
          await signOut(auth);
        } else {
          //Tarkistetaan onko käyttäjä jo olemassa
          if (isLogin) {
            await signInWithEmailAndPassword(auth,email,password);
            console.log("user sign in successful")
          } else {
            //Muuten luodaan uusi käyttäjä
            await createUserWithEmailAndPassword(auth,email,password);
            console.log("user created successfully")
          }
        }
      } catch(error) {
        console.error("Authentication error: ", error.message);
      }
    };
    return(
    <>
      {user ? (
        //Näytetään käyttäjän email, jos on autentikoitunut
      <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
        
     ): (
      //Näytetään signup, jos ei ole autentikoitunut
      <AuthScreen
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        handleAuthentication={handleAuthentication}
      />
     )}
    </>
    );
  }
