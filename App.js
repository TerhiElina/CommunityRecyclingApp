import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './Apps/Screens/LoginScreen';
import AuthenticatedScreen from './Apps/Screens/AuthenticatedScreen';
import SetUserDetails from './Apps/Screens/SetUserDetails';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const [user, setUser] = useState(null);
  const [userDetailsComplete, setUserDetailsComplete] = useState(false); // Add userDetailsComplete state
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  


  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
  
      if (user && userDetailsComplete) {
        // User is authenticated and details are complete, navigate to authenticated screen
        navigation.navigate('AuthenticatedScreen');
      } else if (user && !userDetailsComplete) {
        // User is authenticated but details are not complete, set userDetailsComplete to false
        setUserDetailsComplete(false);
      }
    });
  
    return () => unsubscribe(); // Cleanup function to unsubscribe from auth state changes
  }, [userDetailsComplete, navigation]);

  return (

    <NavigationContainer>
      <Stack.Navigator>
      
      {user ? (
        userDetailsComplete ? (
          <Stack.Screen name="AuthenticatedScreen"
          component ={AuthenticatedScreen}
           />
        ) : (
          <Stack.Screen name="SetUserDetails"
          component= {SetUserDetails}
          navigation={navigation}
          
          />
        )
      ) : (
        <Stack.Screen name="LoginScreen" component = {LoginScreen}/>
      )}
      </Stack.Navigator>
    </NavigationContainer>
);
}

/*<NavigationContainer>
      <View style={{ flex: 1 }}>
        {user ? <AuthenticatedScreen user={user} /> : <LoginScreen />}
      </View>
      <StatusBar style="auto" />
    </NavigationContainer> */
