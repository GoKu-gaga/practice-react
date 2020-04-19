import React from 'react'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'

import { GlobalStyle } from './style'
import { IconStyle } from './assets/iconfont/iconfont'

import routes from './routes/index'
import store from './store/index'

import { Data } from './application/Singers/data'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>
          { renderRoutes(routes) }
        </Data>
      </HashRouter>
    </Provider>
  )
}

export default App
