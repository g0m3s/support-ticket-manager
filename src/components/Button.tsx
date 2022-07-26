import { Button as NBButton, IIconButtonProps, Heading } from 'native-base'

interface ButtonProps extends IIconButtonProps {
  title: string
}

export const Button = ({ ...rest }: ButtonProps) => {
  return (
    <NBButton
      h={14}
      rounded='sm'
      fontSize='sm'
      bg='green.700'
      _pressed={{
        bg: 'green.500'
      }}
      {...rest}
    >
      <Heading color='white' fontSize='sm'>
        {rest.title}
      </Heading>
    </NBButton>
  )
}
