import { useNavigation } from '@react-navigation/native'
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native'
import { Box, Circle, HStack, Text, useTheme, VStack, Pressable, IPressableProps } from 'native-base'

export interface OrderProps {
  id: string
  when: string
  patrimony: number
  status: 'open' | 'closed'
}

export const Order: React.FC<{ data: OrderProps } & IPressableProps> = ({ data, ...rest }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const statusColor = data.status === 'open' ? colors.secondary[700] : colors.green[300]

  const handleOpenDetais = () => {
    navigation.navigate('details', { orderId: data.id })
  }

  return (
    <Pressable onPress={handleOpenDetais} {...rest}>
      <HStack
        mb={4}
        rounded='sm'
        bg='gray.600'
        overflow='hidden'
        alignItems='center'
        justifyContent='space-between'
      >
        <Box h='full' w={2} bg={statusColor} />
        <VStack flex={1} my={5} ml={5}>
          <Text color='white' fontSize='md'>
            Patrimônio: {data.patrimony}
          </Text>
          <HStack alignItems='center'>
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color='gray.200' fontSize='xs' ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>
        <Circle bg='gray.500' mr={5} h={12} w={12}>
          {data.status === 'closed' ? (
            <CircleWavyCheck size={24} color={statusColor} />
          )
            : <Hourglass size={24} color={statusColor} />}
        </Circle>
      </HStack>
    </Pressable>
  )
}
