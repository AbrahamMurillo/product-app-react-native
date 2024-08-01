import { ScrollView, useWindowDimensions } from 'react-native'
import React from 'react'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import CustomIcon from '../../components/ui/CustomIcon'

export default function LoadingScreen() {

  const { height } = useWindowDimensions()

  return (
    <Layout style={{ flex: 1 }} >
      <Text>Loading Screen</Text>
    </Layout>
  )
}