import { Alert } from 'react-native'
import { dateFormat } from '../utils'
import { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import Logo from '../assets/logo_secondary.svg'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { Button, Filter, LoadPage, Order, OrderProps } from '../components'
import { SignOut, ChatTeardropText } from 'phosphor-react-native'
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base'

export const Home: React.FC = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<OrderProps[]>([])
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')

  const handleNewOrder = () => {
    navigation.navigate('new')
  }

  const handleLogOut = () => {
    auth()
      .signOut()
      .catch(() => Alert.alert('Erro ao sair da aplicação'))
  }

  useEffect(() => {
    setIsLoading(true)

    const subscribe = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snap => {
        const data = snap.docs.map((doc) => {
          const { patrimony, description, status, created_at } = doc.data()
          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at)
          }
        })
        setOrders(data)
        setIsLoading(false)
      })

    return subscribe
  }, [statusSelected])

  return (
    <VStack flex={1} pb={6} bg='gray.700'>
      <HStack
        pb={4}
        px={6}
        pt={12}
        w='full'
        bg='gray.600'
        alignItems='center'
        justifyContent='space-between'
      >
        <Logo />
        <IconButton
          onPress={handleLogOut}
          icon={<SignOut size={25} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          mt={8}
          mb={4}
          w='full'
          alignItems='center'
          justifyContent='space-between'
        >
          <Heading color='gray.100'>Solicitações</Heading>
          <Text color='gray.200'>
            3
          </Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type='open'
            title='Em andamento'
            isActive={statusSelected === 'open'}
            onPress={() => setStatusSelected('open')}
          />
          <Filter
            type='closed'
            title='Finalizados'
            isActive={statusSelected === 'closed'}
            onPress={() => setStatusSelected('closed')}
          />
        </HStack>

        {isLoading ? <LoadPage /> : (
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText size={40} color={colors.gray[300]} />
                <Text color='gray.300' mt={6} textAlign='center' fontSize='xl'>
                  Você ainda não possui {'\n '} solicitações
                  {statusSelected === 'open' && ' em aberto'}
                  {statusSelected === 'closed' && ' finalizadas'}
                </Text>
              </Center>
            )}
            contentContainerStyle={{ paddingBottom: 50 }}
            renderItem={({ item }) => <Order data={item} />}
          />
        )}

        <Button
          onPress={handleNewOrder}
          title='Nova solicitação'
        />
      </VStack>
    </VStack>
  )
}
