import { ReactNode } from "react"
import background from '../../assets/background.png'

interface IContentProps {
    children?: ReactNode;
}

export const Content = ({ children }: IContentProps) => {

    return (
        <section
        style={{ 
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat' }}
            className="w-full h-[100vh] overflow-auto flex flex-col items-center bg-[#181920] transition px-[16px] py-[16px] md:py-[32px] lg:py-[48px]"
            >
            <div className="flex flex-col w-full h-full gap-y-[32px] md:w-[85%] lg:w-[75%] xl:w-[55%] transition" >
                {children}
            </div>
        </section>
    )
}