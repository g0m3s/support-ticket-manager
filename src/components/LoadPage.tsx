import { Center, Spinner } from 'native-base'
export const LoadPage = () => {
  return (
    <Center flex={1} bg='gray.700'>
      <Spinner color='secondary.700' />
    </Center>
  )
}
