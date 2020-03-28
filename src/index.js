import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import StoreProvider from './state/Stores'
import theme from './theme'

import App from './App'
import { ThemeProvider } from 'styled-components'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
)
