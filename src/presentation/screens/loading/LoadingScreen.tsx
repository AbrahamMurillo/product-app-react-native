import { ScrollView, useWindowDimensions } from 'react-native'
import React from 'react'
import { Button, Input, Layout, Spinner, Text } from '@ui-kitten/components'
import CustomIcon from '../../components/ui/CustomIcon'

export default function LoadingScreen() {

  const { height } = useWindowDimensions()

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <Spinner status='primary' size='large' />
    </Layout>
  )
}