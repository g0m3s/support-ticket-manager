import { dateFormat } from '../utils'
import { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { OrderFirestoreDTO } from '../DTOs/orderDTO'
import firestore from '@react-native-firebase/firestore'
import { Box, HStack, ScrollView, Text, useTheme, VStack } from 'native-base'
import { Button, CartDetails, Header, Input, LoadPage, OrderProps } from '../components'
import { CircleWavyCheck, DesktopTower, Hourglass, Clipboard } from 'phosphor-react-native'
import { Alert } from 'react-native'

interface RouteParams {
  orderId: string
}

interface OrderDetails extends OrderProps {
  closed: string
  solution: string
  description: string
}

export const Details: React.FC = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = useTheme()
  const [solution, setSolution] = useState('')
  const { orderId } = route.params as RouteParams
  const [isLoading, setIsLoading] = useState(true)
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)

  const handleOrderClose = () => {
    if (!solution) {
      return Alert.alert('Erro', 'Informe a solução para o problema')
    }
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Sucesso', 'Solicitação finalizada')
        navigation.goBack()
      })
      .catch(err => Alert.alert('Erro', err.code))
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, created_at, closed_at, solution } = doc.data()

        const closed = closed_at ? dateFormat(closed_at) : null

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed
        })

        setIsLoading(false)
      })
  }, [])

  if (isLoading) (
    <LoadPage />
  )

  return (
    <VStack flex={1} bg='gray.700'>
      <Box px={6} bg="gray.600">
        <Header pageName='Solicitação' />
      </Box>
      <HStack bg='gray.500' justifyContent='center' p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}
        <Text
          ml={2}
          fontSize='sm'
          textTransform='uppercase'
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
        >
          {order.status === 'closed' && 'Finalizado'}
          {order.status === 'open' && 'Em andamento'}
        </Text>
      </HStack>
      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CartDetails
          title='Equipamento'
          footer={order.when}
          icon={DesktopTower}
          description={`Patrimônio ${order.patrimony}`}
        />
        <CartDetails
          icon={Clipboard}
          title='Descrição do problema'
          description={order.description}
        />
        <CartDetails
          title='Solução'
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === 'open' && <Input
            h={24}
            mt={3}
            multiline
            textAlignVertical='top'
            onChangeText={setSolution}
            placeholder='Descrição da solução'
          />}
        </CartDetails>
        {order.status === 'open' && (
          <Button
            mt={5}
            w='full'
            onPress={handleOrderClose}
            title='Encerrar solicitação'
          />
        )}
      </ScrollView>
    </VStack>
  )
}
