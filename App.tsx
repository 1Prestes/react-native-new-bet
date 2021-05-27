import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from 'styled-components'
import Toast from 'react-native-toast-message'

import { store } from './src/store/store'
import { theme } from './src/assets/style/theme'
import Routes from './src/Routes/routes'

export default function App () {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
      <Toast ref={ref => Toast.setRef(ref)} />
    </Provider>
  )
}
