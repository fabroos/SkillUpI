// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const styles = {
  global: props => ({
    body: {
      backgroundColor: props.colorMode === 'light' ? 'white' : 'gray.900'
    }
  })
}

// 3. extend the theme
const theme = extendTheme({ config, styles })

export default theme
