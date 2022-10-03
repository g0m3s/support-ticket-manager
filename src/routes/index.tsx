import { SignIn } from '../screens'
import { AppRoutes } from './app.routes'
import { LoadPage } from '../components'
import { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

export const Routes = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User>()

  useEffect(() => {
    const subscribe = auth()
      .onAuthStateChanged(res => {
        setUser(res)
        setIsLoading(false)
      })
    return subscribe
  }, [])

  if (isLoading) (
    <LoadPage />
  )

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}
