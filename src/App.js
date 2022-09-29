import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import MRouter from './router'
import { store, persistor } from './redux/store'
import './App.css'
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MRouter></MRouter>
        </BrowserRouter>
      </PersistGate>
    </Provider>

  )
}
