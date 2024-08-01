import { View } from 'react-native'
import React from 'react'
import { Button, Icon, Layout, Text } from '@ui-kitten/components'

export default function HomeScreen() {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: "center" }} >
      <Text>HomeScreen</Text>
      <Button
        accessoryLeft={<Icon name='home' />}
      >
        <Text>Home</Text>
      </Button>
    </Layout>
  )
}