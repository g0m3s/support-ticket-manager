import { useState } from 'react'
import { Alert } from 'react-native'
import { Input, Button } from '../components'
import Logo from '../assets/logo_primary.svg'
import auth from '@react-native-firebase/auth'
import { Envelope, Key } from 'phosphor-react-native'
import { Heading, VStack, Icon, useTheme, Text } from 'native-base'

export const SignIn = () => {
  const { colors } = useTheme()
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = () => {

    if (!mail || !password) {
      return Alert.alert('Entrar', 'Informe e-mail e senha')
    }
    setIsLoading(true)

    auth()
      .signInWithEmailAndPassword(mail, password)
      .catch(error => {
        setIsLoading(false)
        return Alert.alert('Erro', error.code.split('/')[1].replace('-', ' '))
      })
  }

  return (
    <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
      <Logo />
      <Text>{mail}</Text>
      <Heading color='gray.100' fontSize='2xl' mt={20} mb={12}>Acesse sua conta</Heading>
      <Input
        mb={4}
        placeholder='E-mail'
        onChangeText={setMail}
        InputLeftElement={<Icon ml={4} as={<Envelope color={colors.gray[300]} />} />}
      />
      <Input
        mb={8}
        secureTextEntry
        placeholder='Senha'
        onChangeText={setPassword}
        InputLeftElement={<Icon ml={4} as={<Key color={colors.gray[300]} />} />}
      />
      <Button
        w='full'
        title='Entrar'
        isLoading={isLoading}
        onPress={handleSignIn}
      />
    </VStack>
  )
}
