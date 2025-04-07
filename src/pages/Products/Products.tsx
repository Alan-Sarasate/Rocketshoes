import {useEffect, useState } from "react"
import { Content } from "../../components/Content/Content"
import { Header } from "../../components/Header/Header"
import IProduct from "../../types/interfaces/Product"
import { CardProduct } from "./componets/CardProduct/CardProduct"



export const Products = () => {

    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/products");
                if (!response.ok) {
                    throw new Error("Erro ao buscar produtos");
                }
                const data = await response.json();
                setProducts(data);
                
            } catch (error: any) {
                alert(error)
            }
        };
        fetchProducts();
    }, []);


 return (
        <Content>
            <Header/>
            <section className="w-full grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] pb-[24px] gap-[12px] mb-[32px]">
                {products.map(product =>  <CardProduct key={product.id} id={product.id} image_url={product.image} product_name={product.title} price={product.price}/>)}
            </section>
        </Content>
    ) 
}