import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'styled-components'

import { store } from './src/store/store'
import { theme } from './src/assets/style/theme'
import BottomRoutes from './src/Routes/bottom-routes'

export default function App () {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <BottomRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  )
}
