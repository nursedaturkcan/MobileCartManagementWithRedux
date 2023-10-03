import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookScreen from './src/pages/BookScreen';
import CartScreen from './src/pages/CartScreen';
import ShoppingCartIcon from './src/components/ShoppingCartIcon';
import { Provider } from 'react-redux';
import store from './src/redux/store';



const Stack=createNativeStackNavigator();

const App = () => {

  
  return (
      <Provider store={store}>
        
     
    <NavigationContainer>
      <StatusBar hiiden/>
        <Stack.Navigator>
          <Stack.Screen name='Books' component={BookScreen} 
            options={{
              headerRight:()=>(<ShoppingCartIcon/>)
            }}
           
          />
          <Stack.Screen name='Cart' component={CartScreen} options={{
          headerBackVisible:false
          }} />
        </Stack.Navigator>
        
      </NavigationContainer>
      </Provider>
     
  )
}

export default App

const styles = StyleSheet.create({})