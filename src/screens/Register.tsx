import { VStack } from 'native-base'
import { useState } from 'react'
import { Alert } from 'react-native'
import { Header, Input, Button } from '../components'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

export const Register: React.FC = () => {
  const navigation = useNavigation()
  const [patrimony, setPatrimony] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [description, setDescription] = useState('')

  const handleNewOrder = () => {
    if (!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos')
    }
    setIsLoading(true)

    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Sucesso', 'Solicitação enviada')
        navigation.goBack()
      })
      .catch((err) => {
        Alert.alert('Erro', err.code)
      })
  }

  return (
    <VStack flex={1} p={6} bg='gray.600'>
      <Header pageName='Registro' />
      <Input onChangeText={setPatrimony} placeholder='Número do patrimônio' mt={4} />
      <Input
        mt={5}
        flex={1}
        multiline
        textAlignVertical='top'
        onChangeText={setDescription}
        placeholder='Descrição do problema'
      />
      <Button isLoading={isLoading} onPress={handleNewOrder} title='Cadastrar' mt={5} />
    </VStack>
  )
}
