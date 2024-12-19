import "./adminsummary.css"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { useNavigate} from 'react-router-dom';


const Adminsummary = ({adminData}) => {
  const navigate = useNavigate();

const {orderid} = useParams()
const orderids = Number(orderid)
const [orderSummary, setOrderSummary]   = useState(null)
const [orderUser, setOrderUser]   = useState(null)


 useEffect(()=>{
  const temp = adminData && adminData.find((orderitem)=>{ return orderitem.id === orderids})

  if(temp)
  {
    setOrderSummary(temp.userdata)
    setOrderUser(temp)
  }

 },[adminData])


const handleDelete = async () =>{
const {data, error} = await supabase
.from("brandname_orders")
.delete()
.eq('id', orderUser.id)
.select()

if(error){
  console.log(error)
}
if(data)
{
  console.log(data)
  return navigate(-1)
  
}

}

    let total = 0 
    let grandTotal=0   
    if(orderSummary){
      orderSummary.map((cartItem)=>{

          if(cartItem.discountPrice === 0){
          if(cartItem.quantity > 1 )
          {
            total = total +  (cartItem.price*cartItem.quantity)
          }
          else{
            total = total + cartItem.price
          }
        }
          if(cartItem.discountPrice > 0)
          {
          if(cartItem.quantity > 1 )
          {
            total = total + (cartItem.discountPrice*cartItem.quantity)
          }
            else{total = total + cartItem.discountPrice}
          }
        })
        grandTotal = 50 + total
      }


    return ( 
     
  <div className="admin__ordersummary flow">
    <div className='product-items'>
    <div className='product__items-container '>
     <h2 className='fw-500-bold text-capital fs-primary-heading letter-spacing-300 margin-b-2 '>
        summary</h2>
     <div className='margin-b-2'>
      {!orderSummary &&  <div>Loading...</div> }
{
 orderSummary &&  orderSummary.map((cartItem)=>
<div className="shopping__cart-items" key={cartItem.id} >
  <div className="shopping__cart-img-title-container">
  <Link  to={'/products/' + cartItem.season +'/' + cartItem.id}>
  <div className="shopping__cart-items-img">
    <img src={cartItem.image} alt="" />
  </div>
  </Link>
  <div className=" shopping__cart-items-title ">
  <span className="fw-700-bold margin-b-0">{cartItem.name}</span>
  <div className="dflex  gap ">
  <div>
  <span className="clr-dim-100 font-size-500">
  Rs.{cartItem.discount > 0 ? cartItem.discountPrice : cartItem.price}</span>
  
  {cartItem.discount > 0 &&(
  <span className="clr-dim-100 price_line-through font-size-300">Rs.{cartItem.price}</span>)
}
  </div>
  <div>
  {cartItem.discount > 0 &&(
 <span className='[ font-size-400 fw-700-bold discount ]'>
    -{cartItem.discount}%</span>)
 }
 </div>
  </div>

  </div>
  </div>
  <div className="shoppping__cart-btn-container">
<div className='dflex gap align-item-center'><span>x</span>
<span className='fw-700-bold'>{cartItem.quantity}</span></div>
</div>
</div> 
)}
     </div>

     <div>
    <div className='margin-b-5'>
    <div className='jc-space-between dflex'><span className='clr-dim-100 fw-500-bold'>Total</span>
     <span className='fw-500-bold'>+{total.toLocaleString()}</span></div>
    <div className='jc-space-between dflex'><span className='clr-dim-100 fw-500-bold'>Shipping</span> 
    <span className='fw-500-bold'>+50</span></div>  
    </div>

    <div className='jc-space-between dflex'>
        <span className='clr-dim-100 fw-500-bold font-size-500'>Grand total</span> 
        <span className='font-size-500 fw-700-bold'>Rs.{grandTotal.toLocaleString()}</span></div>
     </div>
    </div>
    </div>

    <div className="admin_summary-detials product__items-container">
      {!orderUser && <div>loading...</div>  }
      {orderUser && <div className="dflex dflex-column">
        <span>Name: <span>{orderUser.name}</span></span>
        <span>Email: <span>{orderUser.email}</span></span>
        <span>Phone: <span>{orderUser.phone}</span></span>
        <span>Address: <span>{orderUser.address}</span></span>
        <span>City: <span>{orderUser.city}</span></span>
        <span>Country: <span>{orderUser.country}</span></span>
      </div>}
      <div>
      </div>
      <div><button onClick={handleDelete}>delete</button></div>
    </div>
    </div> 
     );
}
 
export default Adminsummary;