import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import ItemList from '../ItemList';
import ProductDetail from '../ProductDetail';

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {


  return (
    
      <Stack.Navigator>
        <Stack.Screen name='home' component={HomeScreen}
          options={{headerShown: false}} />
        <Stack.Screen name='item-list' component={ItemList}
          options={({ route }) => ({ title: route.params.category,
            headerStyle: {backgroundColor: '#fc8181'},
            headerTintColor: '#fff'})} //Asettaa titleksi oikean categorian + tyylittelyt
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