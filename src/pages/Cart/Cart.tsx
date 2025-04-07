import {useEffect, useRef, useState } from "react"
import { Content } from "../../components/Content/Content"
import { Header } from "../../components/Header/Header"
import IProduct from "../../types/interfaces/Product"
import { useCart } from "../../hooks/useCart"
import { FaTrash } from "react-icons/fa"
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu"

export const Cart = () => {

    const [products, setProducts] = useState<IProduct[]>([])
    const amountInputRef = useRef<Record<string, HTMLInputElement | null>>({})
    const {completeOrder, removeProduct, products: cart, updateProductAmount} = useCart();

    
    useEffect(()=>{
        try {
            const fetchProducts = async () => {
                const response = await fetch('http://localhost:5000/products')
                if(!response.ok){
                    alert("Erro ao carregar produtos")
                    return
                }
                const data = await response.json()
                setProducts(data)
            } 
            fetchProducts()
        } catch (error) {
            alert(error)
        }
    }, [])


    return (
        <Content>
            <Header/>
            <section className="w-full bg-white px-[24px] pt-[24px] mb-[24px] rounded-[4px]">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="text-[#a0a0a0] text-[12px] mb-[12px]">
                            <th className="w-[15%] justify-start"></th>
                            <th className="w-[45%] justify-start text-left"><p>PRODUTO</p></th>
                            <th className="w-[15%] justify-start text-left"><p>QTD</p></th>
                            <th className="w-[15%] justify-start text-left"><p>SUBTOTAL</p></th>
                            <th className="w-[10%] justify-start text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((product, index) => {
                            const cartProduct = products.find(cartProduct => cartProduct.id === product.product_id)

                            return <tr key={index} className="w-full h-full">
                                <td>
                                    <div className="w-full h-full">
                                        <img src={cartProduct?.image} className="w-full h-full"/>
                                    </div>
                                </td>

                                <td className="p-[8px]">
                                    <div className="w-full h-full flex flex-col">
                                        <span>{cartProduct?.title}</span>
                                        <span className="text-[16px] font-bold">{`R$ ${(cartProduct?.price || 0).toFixed(2)}`}</span>
                                    </div>
                                </td>

                                <td className="items-center p-[8px]">
                                    <div className="flex flex-row justify-center items-center gap-[12px]">
                                        <button 
                                            className="cursor-pointer text-[#7061bf] w-[16px] h-[16px]"
                                            onClick={() => {
                                                const amount = updateProductAmount(product.product_id, ((product.quantity??0)-1))
                                                let ref = amountInputRef.current[product.product_id]
                                                if(!ref) return
                                                ref.value = String(amount)
                                            }}>
                                            <LuCircleMinus />
                                        </button>
                                        <input 
                                            type="number" 
                                            defaultValue={product.quantity??0}
                                            ref={(input) => {
                                                if(!amountInputRef.current) return
                                                amountInputRef.current[product.product_id] = input}}
                                            className="w-[35%] text-[14px]"
                                            onBlur={(e) => {
                                                const amount = updateProductAmount(product.product_id, Number(e.target.value))
                                                let ref = amountInputRef.current[product.product_id]
                                                if(!ref) return
                                                ref.value = String(amount)
                                            }}
                                        />
                                        <button 
                                            className="cursor-pointer text-[#7061bf] w-[16px] h-[16px]"
                                            onClick={() => {
                                                const amount = updateProductAmount(product.product_id, ((product.quantity??0)+1))
                                                let ref = amountInputRef.current[product.product_id]
                                                if(!ref) return
                                                ref.value = String(amount)
                                            }}
                                            >
                                            <LuCirclePlus />
                                        </button>
                                    </div>
                                </td>

                                <td className="text-[16px] font-semibold p-[8px]">
                                    <div className="h-full w-full">
                                        <span>{`R$ ${((product.quantity??0) * (cartProduct?.price??0)).toFixed(2)}`}</span>
                                    </div>
                                </td>
                                <td className="p-[8px]">
                                    <button className="cursor-pointer" onClick={() => removeProduct(product.product_id)}><FaTrash className="text-[#7061bf] text-[14px]"/></button>
                                </td>  
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className="w-full flex flex-row justify-between py-[24px] font-semibold">
                    <button 
                        className="py-[6px] px-[12px] bg-[#7061bf] rounded-[2px] text-white cursor-pointer"
                        onClick={() => completeOrder()}
                        >Finalizar pedido</button>
                    <div className="flex flex-row gap-[4px] items-end">
                        <p className="text-[12px] text-[#b3b3b3]">TOTAL</p>
                        <span className="text-[20px] font-bold">R$ {cart.reduce((acum, cartProduct) => {
                            return acum + (cartProduct.quantity??0) * (products.find(p => p.id === cartProduct.product_id)?.price??0)
                        }, 0).toFixed(2)}</span>
                    </div>
                </div>
            </section>
        </Content>
    )
}