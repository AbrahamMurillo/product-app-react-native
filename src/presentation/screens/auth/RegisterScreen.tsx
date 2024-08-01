import { ScrollView, useWindowDimensions } from 'react-native'
import React from 'react'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import CustomIcon from '../../components/ui/CustomIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigator'

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }

export default function RegisterScreen({ navigation }: Props) {

  const { height } = useWindowDimensions()

  return (
    <Layout style={{ flex: 1 }} >
      <ScrollView style={{ marginHorizontal: 40 }} >
        <Layout style={{ paddingTop: height * 0.25 }} >
          <Text category='h1' >Crear cuenta</Text>
          <Text category='p2'>Ingrese sus datos para una nueva cuenta</Text>
        </Layout>
        <Layout style={{ marginTop: 20, }}>
          <Input
            placeholder='nombre completo'
            accessoryLeft={<CustomIcon name='person-outline' />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder='correo electronico'
            keyboardType='email-address'
            autoCapitalize='none'
            accessoryLeft={<CustomIcon name='email-outline' />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder='Contraseña'
            autoCapitalize='none'
            secureTextEntry
            accessoryLeft={<CustomIcon name='lock-outline' />}
            style={{ marginBottom: 10 }}
          />
        </Layout>
        <Layout style={{ height: 20 }} />
        <Layout>
          <Button
            accessoryLeft={<CustomIcon name='arrow-forward-outline' white />}
          >
            Crear
          </Button>
        </Layout>
        <Layout style={{ height: 20 }} />
        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Text>Ya tienes cuenta?</Text>
          <Text status='primary' category='s1' onPress={() => navigation.goBack()} > Ingresar</Text>
        </Layout>
      </ScrollView>
    </Layout>
  )
}