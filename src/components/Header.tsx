import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'
import { Heading, HStack, IconButton, useTheme, StyledProps } from 'native-base'

interface HeaderProps extends StyledProps {
  pageName: string
}

export const Header: React.FC<HeaderProps> = ({ pageName, ...rest }) => {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const handleGoBack = () => navigation.goBack()

  return (
    <HStack
      pt={12}
      w='full'
      bg='gray.600'
      alignItems='center'
      justifyContent='space-between'
      {...rest}
    >
      <IconButton
        onPress={handleGoBack}
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
      />
      <Heading
        ml={-6}
        flex={1}
        fontSize='lg'
        color='gray.100'
        textAlign='center'
      >
        {pageName}
      </Heading>
    </HStack>
  )
}
