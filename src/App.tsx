import { BrowserRouter } from 'react-router-dom'
import {Routes} from './routes'
import { ToastContainer } from 'react-toastify'
import './global.css'

import { CartProvider } from './hooks/useCart'

function App() {

  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <ToastContainer/>
          <Routes/>
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App
