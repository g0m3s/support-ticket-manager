import { Header } from '../components'
import { Text, VStack } from 'native-base'
import { useRoute } from '@react-navigation/native'

interface RouteParams {
  orderId: string
}

export const Details: React.FC = () => {
  const route = useRoute()
  const { orderId } = route.params as RouteParams

  return (
    <VStack flex={1} p={6} bg='gray.700'>
      <Header pageName='Solicitação' />
      <Text color='white'>{orderId}</Text>
    </VStack>
  )
}
