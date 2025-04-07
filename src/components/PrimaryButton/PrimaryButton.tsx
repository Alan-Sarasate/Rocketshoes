import { MdAddShoppingCart } from "react-icons/md";


interface IPrimaryButtonProps {
    label: string
    quantity?: number;
    handleClick: () => void;
}

export const PrimaryButton: React.FC<IPrimaryButtonProps> = ({label, quantity = 0, handleClick}) => {
    return (
        <button onClick={() => handleClick()} className="flex flex-row items-center w-full h-[36px] bg-[#7061bf] cursor-pointer text-white rounded">
            <div className="flex flex-row h-full bg-[#6657ad] items-center gap-[6px] p-[6px] rounded">
                <MdAddShoppingCart />
                <span>{quantity}</span>
            </div>
            <span className="flex h-full flex-1 flex-row items-center justify-center px-[6px]">
             {label || "Label"}
            </span>
        </button>
        
    )
}