import { View, Text, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Button } from '@ui-kitten/components'
import CustomIcon from './CustomIcon'

interface Props {
    iconName: string
    style?: StyleProp<ViewStyle>
    onPress: () => void
}

export default function FAB({ style, iconName, onPress }: Props) {
    return (
        <Button
            style={[style, {
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 10,
                },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 3,
                borderRadius: 13,
            }]}
            accessoryLeft={<CustomIcon name={iconName} white />}
            onPress={onPress}
        />
    )
}