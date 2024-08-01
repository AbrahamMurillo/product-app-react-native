import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './presentation/navigation/StackNavigator';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { API_URL, STAGE } from '@env';

export default function ProductsApp() {

    const colorScheme = useColorScheme()
    const theme = colorScheme === 'dark' ? eva.dark : eva.light
    const backgroundColor = (colorScheme === 'dark')
        ? theme["color-basic-800"]
        : theme["color-basic-100"]

    console.log(`${API_URL}`, STAGE)
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
                {...eva} theme={theme}
            >
                <NavigationContainer theme={{
                    dark: colorScheme === 'dark',
                    colors: {
                        primary: theme['color-primary-500'],
                        background: backgroundColor,
                        card: theme["color-basic-100"],
                        text: theme["text-basic-color"],
                        border: theme["color-basic-100"],
                        notification: theme["color-primary-500"]
                    }
                }}>
                    <StackNavigator />
                </NavigationContainer>
            </ApplicationProvider>
        </>

    )
}