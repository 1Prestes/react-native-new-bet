import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'styled-components'

import { theme } from './src/assets/style/theme'
import StackRoutes from './src/Routes/stack-routes'

export default function App () {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </ThemeProvider>
  )
}
