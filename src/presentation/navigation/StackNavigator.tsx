import React from 'react'
import { createStackNavigator, StackCardInterpolatedStyle, StackCardStyleInterpolator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import LoadingScreen from '../screens/loading/LoadingScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProductScreen from '../screens/product/ProductScreen';
import LoginScreen from '../screens/auth/LoginScreen';

export type RootStackParams = {
    LoadingScreen: undefined;
    LoginScreenAuth: undefined;
    RegisterScreen: undefined;
    HomeScreen: undefined;
    ProductScreen: { productId: string }
}

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
    return {
        cardStyle: {
            opacity: current.progress,
        }
    }
}

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                //cardStyleInterpolator: fadeAnimation
            }}>
            <Stack.Screen  options={{cardStyleInterpolator: fadeAnimation}} name="LoginScreenAuth" component={LoginScreen} />
            <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="HomeScreen" component={HomeScreen} />
            <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}} name="LoadingScreen" component={LoadingScreen} />
        </Stack.Navigator>
    )
}