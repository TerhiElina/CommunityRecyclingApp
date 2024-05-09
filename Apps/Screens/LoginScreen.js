import { Button, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import TabNavigation from './Navigation/TabNavigation';
import { app } from '../../firebaseConfig';
import AuthenticatedScreen from './AuthenticatedScreen';



const AuthScreen = ({email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication}) => {
  
  
    return (
    <View>
      <Image source={require('./../../assets/images/loginpic.jpg')}
            className="w-full h-96 object-cover" />

    <View className="p-8 bg-white mt-[-20px] rounded-t-3xl">
        <Text className="text-[30px] font-bold">Kierrätys</Text>
        <Text className="text-[18px] text-slate-500 mt-6"> Kierrätä talonyhtiön, työpaikan tai vaikka ystävien kesken!</Text>
        <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder='Sähköposti'
            autoCapitalize='none'
        />
        <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder='Salasana'
            secureTextEntry
        />
        <View>
          <TouchableOpacity>
            <Button title={isLogin ? 'Kirjaudu' : 'Rekisteröidy'} onPress={handleAuthentication} />       
          </TouchableOpacity>
        </View>
        {/*Tähän tulee styleksi buttoncontainer */}
        <View>
          <Text onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Oletko uusi käyttäjä? Rekisteröidy' : 'Onko sinulla jo tili? Kirjaudu'}
            </Text> 
        </View>  
    </View>
    </View>
  )
}
/*const AuthenticatedScreen = ({user, handleAuthentication}) =>{
  return(
    
     <View>
      <Text> Welcome</Text>
      <Button title="Kirjaudu ulos" onPress={handleAuthentication}/>
        <TabNavigation/>
      </View>
    
  )
}*/
  export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null); // Tämän avulla trackataan, onko käyttäjä kirjautunut
    const [isLogin, setIsLogin] = useState(true);

    const auth = getAuth(app);
    useEffect(() =>{
      const unsubscribe = onAuthStateChanged(auth, (user) =>{
        setUser(user);
    });
    //Puhdistetaan subscription
    return () => unsubscribe();
    }, [auth]);

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


/*<TouchableOpacity className="p-3 bg-blue-500 rounded-full mt-20">
            <Text className="text-white text-center text-[18px]">Kirjaudu</Text>
        </TouchableOpacity>*/