import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import ItemDetail from "../itemdetail/ItemDetail"

function ItemDetailContainer() {
    const [detail, setDetail] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const getProduct = async() => {
            const response = await fetch('https://fakestoreapi.com/products')
            const products = await response.json()
            const filtredProduct = products.find(product => product.id === parseInt(id))
            setDetail(filtredProduct)
        }
       getProduct()
    }, [id])

    return(
        <ItemDetail detail={detail} />
    );
}
export default ItemDetailContainer