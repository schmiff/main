import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TouchScreen from './screens/TouchScreen';
import ResultScreen from './screens/ResultScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type AppStackParams = {
  Touch;
  Result: {
      uri
      width
      height
    };
}

const AppStack = createNativeStackNavigator<AppStackParams>()

export default function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{headerShown:false}} initialRouteName='Touch'>
        <AppStack.Screen name='Touch' component={TouchScreen}/>
        <AppStack.Screen name='Result' component={ResultScreen}/>
      </AppStack.Navigator>
    </NavigationContainer>

  );
}
