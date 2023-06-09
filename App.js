import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import store from './src/store'
import Main from './src/components/screens/main'
import Description from './src/components/screens/description'
import About from './src/components/screens/about'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="main" component={Main} />
      <Stack.Screen name="Description" component={Description} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => { 
           let iconName;
           if (route.name === 'Home') {
             iconName = 'home'
           } else if (route.name === 'About') {
             iconName = 'info-circle' 
           }
           return <FontAwesome 
           name={iconName} size={size} color={color} style = {{marginTop:6}} /> 
          },
        })}
        tabBarOptions={
          {
          activeTintColor: '#688392',
          inactiveTintColor: '#cbdbe2',
          style: {
            paddingBottom:4
          },
        }}
      > 
    
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="About" component={About} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
