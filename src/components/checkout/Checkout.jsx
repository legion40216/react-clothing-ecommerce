import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import './checkout.css'

const Checkout = ({userData,handleCheckout}) => {
 
    const navigate = useNavigate();

    useEffect(()=>{

        if(userData && Object.keys(userData).length === 0){
          return  navigate('/'+"#Navbar")
        }
    },[userData])

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [country,setCountry] = useState('')
    const [city,setCity] = useState('')
    const [address,setAddress] = useState('')

  
    const [errors,setErrors] = useState({name:false, email:false ,phone:false,country:false,city:false,address:false}) 
    let  valid = true
    const [sectionRedirect, setsectionRedirect] = useState()
    const [orderCollected, setorderCollected] = useState(false)
    const [orderSend, setorderSend] = useState(false)
    const [checkRetyped, setcheckRetyped] = useState(false)

    const handlesubmit = () =>{
       if(name.trim().length < 1 )
       {   valid = false
           setErrors(prevState =>({...prevState,name:true}))
    
       }
       else{
           setErrors((prevState =>({...prevState,name:false})))
       
       }
        if(email.trim().length < 1)
       {    valid = false
            setErrors(prevState =>({...prevState,email:true}))
            
       }
       else{
           setErrors((prevState =>({...prevState,email:false})))
       }
       if(phone.trim().length < 1)
       {    valid = false
            setErrors(prevState =>({...prevState,phone:true}))
            
       }
       else{
         
           setErrors((prevState =>({...prevState,phone:false})))
       }
       if(country.trim().length < 1)
       {    valid = false
            setErrors(prevState =>({...prevState,country:true}))
            
       }
       else{
         
           setErrors((prevState =>({...prevState,country:false})))
       }
       if(city.trim().length < 1)
       {    valid = false
            setErrors(prevState =>({...prevState,city:true}))
            
       }
       else{
         
           setErrors((prevState =>({...prevState,city:false})))
       }
       if(address.trim().length < 1)
       {    valid = false
            setErrors(prevState =>({...prevState,address:true}))
            
       }
       else{
         
           setErrors((prevState =>({...prevState,address:false})))
       }
       if(valid)
       {
          
           setorderCollected(true)
      
       }
       else{
       setcheckRetyped(true)
       }
    }
    
   useEffect(()=>{
    if(orderSend === true )
    {
      handleCheckout({name,email,phone,address,country,city,userData})
      setName('')
      setEmail('')
      setPhone('')
      setAddress('')
      setCountry('')
      setCity('')
    }
   },[orderSend])


    useEffect(()=>{
    
      if(name.trim().length < 1|| phone.trim().length < 1 || email.trim().length < 1)
      {  
        
        setsectionRedirect("#home_section2")
      }
      else if(address.trim().length < 1|| city.trim().length < 1|| country.trim().length < 1)
      {
     
         setsectionRedirect("#home_section")
      }
      else{
       setsectionRedirect(null)
      }

   if(valid === checkRetyped){

      if(name.trim().length >= 0){
        setErrors((prevState =>({...prevState,name:false})))
      }
      if(phone.trim().length >=  1){
        setErrors((prevState =>({...prevState,phone:false})))
      }
      if(email.trim().length >=  1){
        setErrors((prevState =>({...prevState,email:false})))
      }
      if(address.trim().length >=  1){
        setErrors((prevState =>({...prevState,address:false})))
      }
      if(city.trim().length >=  1){
        setErrors((prevState =>({...prevState,city:false})))
      }
      if(country.trim().length >=  1){
        setErrors((prevState =>({...prevState,country:false})))
      }
    }
    },[name, phone, email,address,city,country])
     
    let total = 0 
    let grandTotal=0   
    if(userData){
        userData.map((cartItem)=>{

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
        <div className='checkout__main container'> 
        <div className='margin-b-5'>
          <button className='button' onClick={()=>{navigate(-1)}}>back to shop</button>
          </div>
        <div className='checkout '> 
        <div className='checout__main flow2 '>
         <form className="add-form flow2" >
         <div className='checout__main-billing-shipping' id="home_section2" >
        <h2 className='fw-500-bold text-capital fs-primary-heading letter-spacing-300 margin-b-2'>
        billing details</h2>
          
            <div className='billing-shipping-container'>
            <div>
            <div className="dflex align-item-center jc-space-between">
              <label htmlFor="name">Name</label>{errors.name && <span className='error'>*can't be empty</span>}</div>
            <input className={`${errors.name ? "checkout__error":""}`} type="text" name="" id="name"  placeholder='Alexa Ward' value={name} 
            onChange={(e)=>{setName(e.target.value)}}  />
            </div>
            <div>
            <div className="dflex align-item-center jc-space-between">
              <label htmlFor="email">Email Address</label> 
              {errors.email && <span className='error'>*can't be empty</span>}</div>
            <input className={`${errors.email ? "checkout__error":""}`} required type="email" name="" id="email"  placeholder='User@email.com' value={email} 
            onChange={(e)=>{setEmail(e.target.value)}}  />
            </div>
           
           
            <div>
            <div className="dflex align-item-center jc-space-between">
              <label htmlFor="phone">Phone</label>
              {errors.phone && <span className='error'>*can't be empty</span>}</div>
                <input className={`${errors.phone ? "checkout__error":""}`} type="number" name="" id="phone" placeholder='+92454545' value={phone} 
                onChange={(e)=>{setPhone(e.target.value)}}  />
            </div>
            </div>
      
         </div>

         
         <div className='checout__main-billing-shipping' id="home_section">
            <h2 className='fw-500-bold text-capital fs-primary-heading letter-spacing-300 margin-b-2'>
                shipping info</h2>
        
                <div className='billing-shipping-container'>
            <div className='grid-3rd'>
                <div className="dflex align-item-center jc-space-between">
                  <label htmlFor="address">Address</label>
                  {errors.address &&  <span className='error'>*can't be empty</span>}</div>
                <input className={`${errors.address ? "checkout__error":""}`} type="text" name="" id="address"  placeholder='William Avenu'  
                value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
            </div>
            <div>
                <div className="dflex align-item-center jc-space-between">
                  <label htmlFor="city">City</label>
                  {errors.city && <span className='error'>*can't be empty</span>}</div> 
                <input className={`${errors.city ? "checkout__error":""}`} type="text" name="" id="city" placeholder='Hyderabad'  value={city} 
                onChange={(e)=>{setCity(e.target.value)}} />
            </div>
            <div>
                 <div className="dflex align-item-center jc-space-between">
                  <label htmlFor="country">Country</label>
                  {errors.country  && <span className='error'>*can't be empty</span>}</div>
                <input className={`${errors.country ? "checkout__error":""}`} type="text" name="" id="country" placeholder='Pakistan'  value={country} 
                onChange={(e)=>{setCountry(e.target.value)}} />
            </div>
            </div>
           
         </div>
      <div className='payment-method'>
      <h2 className='fw-500-bold text-capital fs-primary-heading letter-spacing-300 margin-b-2'>
        Payment Method</h2>
       <div className='margin-b-4'><span>*Cash on Delivery</span></div>
       </div> 
     
     </form>
     <div className='dflex justify-content-center'>
      <a href={sectionRedirect}><button onClick={handlesubmit} className='checkout_btn'>Continue and Pay</button></a>
     </div>
    </div>



        <div className='product-items'>
            <div className='product__items-container '>
         <h2 className='fw-500-bold text-capital fs-primary-heading letter-spacing-300 margin-b-2 '>
            summary</h2>
         <div className='margin-b-2'>
    {
     userData &&  userData.map((cartItem)=>
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
        </div>
        
      {orderCollected && (
        <div className='checkout__backdrop'>
          <div className='model flow '>
            <h1 className='font-size-600 margin-b-4'>Thank you, for shopping with us 🎉</h1>
            <p>You will reciveve a confimation message shortly</p>
      <button className='button' onClick={()=>{setorderSend(true)}}>Continue Shopping</button>
          </div>
        </div>
        )}
        </div>
        
     );
}
 
export default Checkout;