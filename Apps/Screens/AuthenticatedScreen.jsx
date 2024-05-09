import React from 'react';
import { Text, Button, View } from 'react-native';
import TabNavigation from './Navigation/TabNavigation';
import LoginScreen from './LoginScreen';

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={{ flex: 1 }}>
        <View style={{marginTop: 50, width:160, alignItems:'flex-end'}}>
      <Button title="Kirjaudu ulos" onPress={handleAuthentication} />
      </View>
      <TabNavigation />
    </View>
  );
};

export default AuthenticatedScreen;