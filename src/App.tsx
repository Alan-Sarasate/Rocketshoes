import {Routes} from './routes'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './hooks/useCart'
import './global.css'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <CartProvider>
          <Routes/>
        </CartProvider>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
