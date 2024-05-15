import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExploreScreen from '../ExploreScreen';
import ProductDetail from '../ProductDetail';

const Stack = createStackNavigator();

export default function ExploreScreenStackNav() {

  
    return (
    <Stack.Navigator>
       <Stack.Screen name='explore-tab' component={ExploreScreen}
       options={{
        headerShown: false
       }}
       /> 
       
       <Stack.Screen name='product-detail' component={ProductDetail}
       options={{
        headerStyle:
        {backgroundColor: '#fc8181'},
        headerTintColor: '#fff',
        headerTitle: 'Tiedot'
      }}  
      />
    </Stack.Navigator>
  )
}