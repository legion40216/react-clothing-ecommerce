import "./admin.css"
import { Link } from "react-router-dom";
import { useNavigate} from 'react-router-dom';

const Admin = ({adminData}) => {

    return ( 
        <div className="admin">
        <div className="container Admin__order-container">
         <h1 className="text-capitalize font-size-600 margin-b-4">order details</h1>
         <ul className="flow" >
         {!adminData && <div>loading...</div>}   
         {adminData && adminData.map((orderItem)=>(
       <li className="order-container__card " key={orderItem.id}>
         <Link to={"/admin/"+ orderItem.id} >
                <h1 className="font-size-500">{orderItem.name}</h1>
                <div className="dflex jc-space-between">
                <div className="dflex dflex-column">
                <span>Item count:</span>
                <span>Address:</span>
                <span>Date:</span>
                </div>
                <div className="dflex dflex-column">
                <span>{Object.keys(orderItem.userdata).length}</span>
                <span>{orderItem.address}</span>
                <span>{orderItem.created_at}</span>
                </div>
                </div>
                </Link> 
            </li>
         ))}
         </ul>
        </div>
        </div>
     );
}
 
export default Admin;