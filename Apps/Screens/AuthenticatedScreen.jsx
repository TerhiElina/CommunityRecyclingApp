import React from 'react';
import { Text, Button, View } from 'react-native';
import TabNavigation from './Navigation/TabNavigation';

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  console.log('HELLO I*M THE USER', user)
  return (
    <View style={{ flex: 1 }}>
        <View style={{marginTop: 50, width:160, alignItems:'flex-end'}}>
      {/*<Button title="Kirjaudu ulos" onPress={handleAuthentication} />*/}
      </View>
      <TabNavigation 
      initialParams={{ user, handleAuthentication }}
      />
    </View>
  );
};

export default AuthenticatedScreen;