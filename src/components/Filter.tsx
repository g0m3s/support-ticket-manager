import React from 'react'
import { Text, Button, IButtonProps, useTheme } from 'native-base'

interface FilterProps extends IButtonProps {
  title: string
  isActive?: boolean
  type: 'open' | 'closed'
}

export const Filter: React.FC<FilterProps> = (props) => {
  const { title, isActive = false, type, ...rest } = props
  const { colors } = useTheme()

  const colorType = type === 'open' ? colors.secondary[700] : colors.green[300]

  return (
    <Button
      flex={1}
      size='60'
      bg='gray.600'
      variant='outline'
      borderColor={colorType}
      borderWidth={isActive ? 1 : 0}
      {...rest}
    >
      <Text
        fontSize='sm'
        textTransform='uppercase'
        color={isActive ? colorType : 'gray.300'}
      >
        {title}
      </Text>
    </Button>
  )
}
