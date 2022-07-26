import { Input as NBInput, IInputProps } from 'native-base'

export const Input = ({ ...rest }: IInputProps) => {
  return (
    <NBInput
      size='md'
      height={14}
      bg='gray.700'
      fontSize='md'
      color='white'
      borderWidth={0}
      fontFamily='body'
      _focus={{
        bg: 'gray.700',
        borderWidth: 1,
        borderColor: 'green.500'
      }}
      placeholderTextColor='gray.300'
      {...rest}
    />
  )
}
