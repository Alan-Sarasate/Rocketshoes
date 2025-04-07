import { PrimaryButton } from "../../../../components/PrimaryButton/PrimaryButton";
import { useCart } from "../../../../hooks/useCart";

interface ICardProductProps {
    id: number;
    image_url: string;
    product_name: string;
    price: number;
}



export const CardProduct: React.FC<ICardProductProps> = ({id, image_url, product_name, price}) => {

    const {products: cart, addProduct} = useCart()

    return(
        <article className="flex flex-col justify-start w-full min-h-[200px] bg-white p-[12px] gap-y-[12px] rounded-[4px]">
            <div className="w-full min-h-[220px]">
                <img src={image_url} alt="Imagem do card" className="w-full h-full" />
            </div>
            <div className="flex flex-1 w-full flex-col justify-between gap-y-[16px]">
                <div className="w-full flex flex-col gap-y-[4px]">
                    <span className="text-black text-[16px] tracking-normal leading-[20px]">{product_name}</span>
                    <span className="text-back text-[20px] font-medium">{`R$${price.toFixed(2)}`}</span>
                </div>
                <PrimaryButton label="Adicionar ao carrinho" handleClick={() => addProduct({product_id: id})} quantity={cart.find(product => product.product_id === id)?.quantity || 0}/>
            </div>
        </article>
    )
}