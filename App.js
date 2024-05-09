import { StatusBar } from 'expo-status-bar';
import { Text, View} from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import ExploreScreen from './Apps/Screens/ExploreScreen';
import HomeScreen from './Apps/Screens/HomeScreen';
import TabNavigation from './Apps/Screens/Navigation/TabNavigation';



export default function App() {
  return (
    <NavigationContainer>
   <View style={{flex: 1}}>
      <LoginScreen />
      
    </View>
    <StatusBar style="auto" />
    </NavigationContainer>

  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
