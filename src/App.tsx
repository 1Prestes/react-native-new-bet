import React from 'react'
import { ThemeProvider } from 'styled-components'

import { theme } from './assets/style/theme'
import Authentication from './Pages/Authentication'

export default function App () {
  return (
    <ThemeProvider theme={theme}>
      <Authentication />
    </ThemeProvider>
  )
}
