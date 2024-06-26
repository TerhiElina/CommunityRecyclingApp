import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddPostScreen from '../AddPostScreen';
import ExploreScreen from '../ExploreScreen';
import ProfileScreen from '../ProfileScreen';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import HomeScreen from '../HomeScreen';
import ExploreScreenStackNav from './ExploreScreenStackNav';

const Tab = createBottomTabNavigator();

export default function TabNavigation({user, handleAuthentication}) {
  return (
      <Tab.Navigator screenOptions={{
        headerShown:false
        //Tänne voi muokata iconien värejä
        //tabBarActiveTintColor: '#fff'
      }
      }>
      <Tab.Screen name='home-nav' component={HomeScreenStackNav}
        options={{
            tabBarLabel:({color}) => (
            <Text style={{color:color, fontSize:12,marginBottom:3}}>Koti</Text>
            ),
            tabBarIcon:({color, size}) =>(
                <AntDesign name="home" size={size} color={color} />
            ),
            tabBarLabelPosition: "below-icon"
      }}/>
      <Tab.Screen name="explore" component={ExploreScreenStackNav} 
      options={{
            tabBarLabel:({color}) => (
            <Text style={{color:color, fontSize:12,marginBottom:3}}>Selaa</Text>
            ),
            tabBarIcon:({color, size}) =>(
                <AntDesign name="search1" size={size} color={color} />
            )
      }}/>
      <Tab.Screen name="addpost" component={AddPostScreen} 
      options={{
        tabBarLabel:({color}) => (
        <Text style={{color:color, fontSize:12,marginBottom:3}}>Lisää</Text>
        ),
        tabBarIcon:({color, size}) =>(
            <AntDesign name="camerao" size={size} color={color} />       )
  }}/>
      <Tab.Screen name="profile" component={ProfileScreen}
      initialParams={{handleAuthentication }}
      options={{
        tabBarLabel:({color}) => (
        <Text style={{color:color, fontSize:12,marginBottom:3}}>Profiili</Text>
        ),
        tabBarIcon:({color, size}) =>(
            <Ionicons name="person-circle-outline" size={size} color={color} />

        )
  }}/>
    </Tab.Navigator>
  )
}