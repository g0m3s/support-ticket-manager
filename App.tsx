import React from 'react'
import { THEME } from './src/styles/theme'
import { LoadPage } from './src/components'
import { Routes } from './src/routes'
import { NativeBaseProvider, StatusBar } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

export default function App() {
  const [fontsLeaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
      {!fontsLeaded ? <LoadPage /> : <Routes />}
    </NativeBaseProvider>
  )
}
