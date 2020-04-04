import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import StoreProvider from './state/Stores'
import theme from './theme'

import App from './App'
import { ThemeProvider } from 'styled-components'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
)
