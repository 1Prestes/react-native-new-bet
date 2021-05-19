import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    bg: string
    colors: {
      primary_color: string
      secondary_color: string
      green: string
    }
  }
}
