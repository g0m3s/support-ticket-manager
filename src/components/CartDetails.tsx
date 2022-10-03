import { ReactNode } from 'react'
import { Box, HStack, Text, useTheme, VStack } from 'native-base'
import { IconProps } from 'phosphor-react-native'

interface CartDetailsProps {
  title: string
  footer?: string
  description?: string
  children?: ReactNode;
  icon: React.ElementType<IconProps>
}

export const CartDetails: React.FC<CartDetailsProps> = (props) => {
  const { icon: Icon, title, description, children, footer = null } = props
  const { colors } = useTheme()

  return (
    <VStack bg='gray.600' p={5} mt={5} rounded='sm'>
      <HStack alignItems="center" mb={4}>
        <Icon color={colors.primary[700]} />
        <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
          {title}
        </Text>
      </HStack>

      {!!description && (
        <Text color="gray.100" fontSize="md">
          {description}
        </Text>
      )}

      {children}

      {!!footer && (
        <Box borderTopWidth={1} borderTopColor="gray.400" mt={3}>
          <Text mt={3} color="gray.300" fontSize="sm">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  )
}
