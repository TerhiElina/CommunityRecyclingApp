import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { getUserDocument } from '../utils/Firebase';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebaseConfig';

export default function ProfileScreen({route}) {
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState(null);
  const { handleAuthentication } = route.params;
  const { user } = route.params;
 
  const auth = getAuth(app);
  useEffect(() => {
    
    // Fetch user data when the component mounts
    const fetchUserProfile = async () => {
      const userDoc = await getUserDocument(user.uid);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfilePicture(userData.profilePicture);
        setUsername(userData.username);
        console.log("Username", username)
      }
    };

    fetchUserProfile();
  }, [user]);
  
 
  
  

  return (
    <View>
    <Text className="font-bold mt-5 mb-4 mx-5 text-[20px]">Profiili</Text>
    {profilePicture && <Image source={{ uri: profilePicture }} style={{ width: 100, height: 100 }} />}
    {/*<Button title="Sign Out" onPress={handleLogout} />*/}
    <View style={{marginLeft: 10, marginRight:10}}>
    <Button title="Kirjaudu ulos" onPress={() => signOut(auth)} />
    </View>
  </View>
  );
}