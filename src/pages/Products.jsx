import { Product } from "../components";


const Products = ({ handleAddCart, userData ,RealData,handleLoad }) => {
    return ( 
    <div onLoad={handleLoad}>
    <Product  handleAddCart={handleAddCart} userData={userData}
    RealData={RealData}></Product>
    </div>
    );
}
 
export default Products;