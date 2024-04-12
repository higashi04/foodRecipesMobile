import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Welcome from '../screens/Welcome';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component= {HomeScreen} /> 
                <Stack.Screen name="Welcome" component= {Welcome} />
                <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;