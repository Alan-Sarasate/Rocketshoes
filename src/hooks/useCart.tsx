import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import IStock from "../types/interfaces/Stock";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ICartData {
    product_id: number;
    quantity?: number;
}

interface ICartProviderProps {
    children: React.ReactNode;
}

interface ICartContextData {
    products: ICartData[];
    addProduct: (product: ICartData) => void;
    removeProduct: (index: number) => void;
    updateProductAmount: (product_id: number, quantity: number) => number;
    completeOrder: () => void
}


export const CartContext = createContext<ICartContextData>({} as ICartContextData)

export const CartProvider:React.FC<ICartProviderProps> = ({children}) => {

    const [stock, setStock] = useState<IStock[]>([])
    const [cart, setCart] = useState<ICartData[]>(() => {
        return JSON.parse(localStorage.getItem('@RocketShoes:cart') || '[]')
    })
    const navigate = useNavigate()

    useEffect(
        () => {
            const fetchStock = async () => {
                try{
                    const response = await fetch("http://localhost:5000/stock")
                    if(!response.ok) throw new Error('Erro ao buscar estoque.')
                    const data = await response.json()
                    setStock(data)
                }catch(e){
                    alert(e)
                }
            }

            fetchStock()
            },[])

    useEffect(() => {
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart))
    },[cart])

    const addProduct = useCallback(({product_id}:ICartData) => {
        try {
            const product = cart.find(product => product.product_id == product_id)
            const stock_product = stock.find(stock_product => stock_product.id === product_id)
            
            if(!stock_product) {
                toast.error("Não foi possível adicionar ao carrinho.")
                return
            }
            if(stock_product.amount === 0) {
                toast.error("O produto não possui quantidade em estoque.")
                return
            }

            if(!product) {
                setCart(cart => [...cart, {product_id: product_id, quantity: 1}])
                toast.success("Produto adicionado com sucesso!!!")
                return
            }

            if((stock_product?.amount||0) < ((product.quantity || 0) + 1)){
                toast.error("Quantidade solicitada fora de estoque.")
                return
            }

            setCart(prevCart => prevCart.map(product => product.product_id == product_id ? {...product, quantity: (product.quantity || 0) + 1} : product))
        } catch(e){
            toast.error("Erro na adição do produto.")
        }
    }, [cart, stock])

    const removeProduct = useCallback((product_id:number)=> {
        const newCart = cart.filter(product => product.product_id != product_id)
        setCart(newCart)
    },[cart])

    const updateProductAmount = useCallback((product_id:number, amount:number) => {
        try {
            const product = cart.find(cartProduct => cartProduct.product_id === product_id)

            if(!product){
                toast.error("Produto não encontrado no carrinho")
                return 0
            }
            console.log(amount)
            if(amount <= 0) return 1

            const stockProduct = stock.find(stockProduct => stockProduct.id === product_id)
            console.log("Estoque", stockProduct)

            if((stockProduct?.amount??0) < amount) {
                toast.error("Quantidade solicitada fora de estoque.")
                return stockProduct?.amount!
            }
            setCart(oldCart=> oldCart.map(cartProduct => cartProduct.product_id === product_id? {...cartProduct, quantity: amount}: cartProduct))
            return amount
        } catch (error) {
            toast.error("Erro na alteração da quantidade do produto.")
            return 0
        }

    }, [cart, stock])

    const completeOrder = useCallback(() => {
        setCart([])
        localStorage.removeItem("@RocketShoes:cart")
        navigate('/products')
        toast.success("Pedido concluído com sucesso")
    }, [cart])
    
    return (
        <CartContext.Provider value={{products: cart, addProduct, removeProduct, updateProductAmount, completeOrder}}>
            {children}
            <ToastContainer/>
        </CartContext.Provider>
    )
}

export const useCart = ():ICartContextData => {
    const context = useContext(CartContext)
    return context
}