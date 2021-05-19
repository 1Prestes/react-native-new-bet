import React from 'react'
import { ThemeProvider } from 'styled-components'

import { theme } from './assets/style/theme'
import SignIn from './Pages/Sign-in'

export default function App () {
  return (
    <ThemeProvider theme={theme}>
      <SignIn />
    </ThemeProvider>
  )
}
