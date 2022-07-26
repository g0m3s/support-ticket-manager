import { useState } from 'react'
import Logo from '../assets/logo_secondary.svg'
import { useNavigation } from '@react-navigation/native'
import { SignOut, ChatTeardropText } from 'phosphor-react-native'
import { Button, Filter, Order, OrderProps } from '../components'
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base'

export const Home: React.FC = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open')
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '1',
      status: 'open',
      when: new Date(),
      patrimony: 123.15,
    },
    {
      id: '2',
      status: 'closed',
      when: new Date(),
      patrimony: 123.15,
    },
    {
      id: '3',
      status: 'closed',
      when: new Date(),
      patrimony: 123.15,
    },
    {
      id: '4',
      status: 'open',
      when: new Date(),
      patrimony: 123.15,
    },
  ])

  const handleNewOrder = () => {
    navigation.navigate('new')
  }

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
        <IconButton icon={<SignOut size={25} color={colors.gray[300]} />} />
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
        <Button
          onPress={handleNewOrder}
          title='Nova solicitação'
        />
      </VStack>
    </VStack>
  )
}
