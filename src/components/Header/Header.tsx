import { MdShoppingBasket } from "react-icons/md"
import LogoImage from "../LogoImage/LogoImage"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../hooks/useCart"




export const Header = () => {
    const cart = useContext(CartContext)


    return (
        <nav className="flex justify-between items-center w-full h-[60px] px-[12px]">
            <Link to="/products">
                <LogoImage className="w-[300px] h-full"/>
            </Link>
            <Link to="/cart" className="flex flex-row items-center gap-[12px]">
                <div className="text-white flex flex-col items-end">
                    <span className="text-[14px]">Meu carrinho</span>
                    <span className="text-[12px] text-gray-400">{cart.products.length === 1 ? `${cart.products.length} item` : `${cart.products.length} itens` } </span>
                </div>
                <MdShoppingBasket className="text-white w-[32px] h-[32px]"/>
            </Link>
        </nav>
    )
}