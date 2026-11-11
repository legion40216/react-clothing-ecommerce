import { Product } from "../components";

const Products = ({ handleAddCart, userData, RealData }) => (
  <Product handleAddCart={handleAddCart} userData={userData} RealData={RealData} />
);

export default Products;
