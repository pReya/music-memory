import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import StoreProvider from './state/Stores'
import theme from './theme'

import App from './App'
import { ThemeProvider } from 'styled-components'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <StoreProvider>
          <App />
        </StoreProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
)
