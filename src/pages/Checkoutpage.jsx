import { Checkout } from "../components";

const Checkoutpage = ({userData,handleCheckout}) => {
    return ( 
       <Checkout  userData={userData} handleCheckout={handleCheckout}  />
     );
}
 
export default Checkoutpage;