import { Alert, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import CustomIcon from '../../components/ui/CustomIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../../navigation/StackNavigator'
import { useAuthStore } from '../../store/auth/useAuthStore'

interface Props extends StackScreenProps<RootStackParams, 'LoginScreenAuth'> { }

export default function LoginScreen({ navigation }: Props) {

  const { login, user, token } = useAuthStore()
  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const { height } = useWindowDimensions()

  const onLogin = async () => {

    if (form.email.length === 0 || form.password.length === 0) return;
    setIsPosting(true)
    const wasSucceful = await login(form.email, form.password)
    setIsPosting(false)
    if (wasSucceful) return;
    Alert.alert('Error', 'Usuario y password incorrectos')
  }
  console.log({ user, token })
  return (
    <Layout style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }} >
      <ScrollView style={{ marginHorizontal: 40 }} >
        <Layout style={{ paddingTop: height * 0.25 }} >
          <Text category='h1' >Ingresar</Text>
          <Text category='p2'>Ingrese para continuar</Text>
        </Layout>
        <Layout style={{ marginTop: 20, }}>
          <Input
            placeholder='correo electronico'
            keyboardType='email-address'
            autoCapitalize='none'
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            accessoryLeft={<CustomIcon name='email-outline' />}
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder='Contraseña'
            autoCapitalize='none'
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            secureTextEntry
            accessoryLeft={<CustomIcon name='lock-outline' />}
            style={{ marginBottom: 10 }}
          />
        </Layout>
        <Layout style={{ height: 20 }} />
        <Layout>
          <Button
            disabled={isPosting}
            accessoryLeft={<CustomIcon name='arrow-forward-outline' white />}
            onPress={onLogin}
          >
            Ingresar
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
          <Text>No tienes cuenta?</Text>
          <Text status='primary' category='s1' onPress={() => navigation.navigate('RegisterScreen')}> Crear una nueva cuenta</Text>
        </Layout>
      </ScrollView>
    </Layout>
  )
}