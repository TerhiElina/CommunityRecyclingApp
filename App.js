

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './Apps/Screens/LoginScreen';
import AuthenticatedScreen from './Apps/Screens/AuthenticatedScreen';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe; // Cleanup function to unsubscribe from auth state changes
  }, []);

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {/* Conditionally render either LoginScreen or AuthenticatedScreen based on user authentication status */}
        {user ? <AuthenticatedScreen user={user} /> : <LoginScreen />}
      </View>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

/*export default function App() {
  return (
    <NavigationContainer >
   <View style={{flex: 1}}>
      <LoginScreen />
      
    </View>
    <StatusBar style="auto" />
    </NavigationContainer>

  );
}*/

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
