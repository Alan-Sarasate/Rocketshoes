import {Routes} from './routes'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './hooks/useCart'
import './global.css'

function App() {

  return (
    <>
    <BrowserRouter>
      <CartProvider>
        <Routes/>
      </CartProvider>
    </BrowserRouter>
    </>
  )
}

export default App
