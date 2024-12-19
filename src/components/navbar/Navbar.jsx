import React from "react";
import './navbar.css'
import { useState, useEffect} from "react";
import logo from "../../assets/logo.svg"
import { HashLink as Link } from 'react-router-hash-link';
import {RiCloseLine,RiSunLine,RiShoppingBasketLine,RiFacebookBoxFill
,RiTwitterFill,RiInstagramFill,RiPinterestFill,RiPhoneFill} from 'react-icons/ri'
import  Navlinks  from "../navlinks/Navlinks"

const Navbar = ({navlinks,userData,handleAddCart}) => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const [toggleShoppingCart, setToggleShoppingCart] = useState(false)


    const handleCloseSidebar = () =>{
      setToggleMenu(false)
    }
    let total = 0   
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
 
  }
    const [productQun, setProductQun] = useState(0)
    const [id, setId] = useState(0)
   const handleAdd = (ids,quantity) =>{
    setProductQun(quantity + 1)
    setId(ids)
   }
   
   const handleSub = (ids,quantity) =>{
    if(quantity > 0)
    {
        setProductQun(quantity - 1)
        setId(ids)
    }
    
   }
   useEffect(()=>{
    handleAddCart(productQun,id)
  },[productQun,id])

const Menu = () =>(
      <>
      <nav className="primary-navigation container" id="primary-navigation"  >
      <ul className="navbar-links" aria-label="primary">
     <Navlinks navlinks={navlinks} handleCloseSidebar={handleCloseSidebar} />
      </ul>
      </nav>
      </>
      )

    return ( 
<div  id="Navbar">
<div className="navbar--fixed-top">

<div className="navbar_top container">
<div className="left-groups__header">

<h1>Brandname</h1>

<button className="mobile-nav-toggle" onClick={()=>{setToggleMenu(true)}} 
aria-controls="primary-navigation" aria-expanded={toggleMenu}>
  <span className="visually-hidden">Menu</span>
</button>

</div>
   
<div className="middle-groups__header">
<div className="navbar__logo">
<Link to="/"><img src={logo} alt="" /></Link>  
    </div>
</div>

<div className="right-groups__header">
<div className="shopping_cart" onClick={()=>{setToggleShoppingCart(true)}} >
  <div className="cart_count cursor-pointer">{userData ? Object.keys(userData).length : 0 }</div>
<RiShoppingBasketLine color="#242424" size={35}/></div>
</div>
</div>


{toggleShoppingCart && (
<div className="shopping__cart">
<div role="presentation" 
className="navbar-sidebar__backdrop" 
onClick={()=>{setToggleShoppingCart(false)}}></div>
<div className="shopping__cart-sidebar">
<div className="shopping__cart-brand">
  <h3 className="fw-500-bold font-size-550 text-capital">cart</h3>
  <div className="cursor-pointer"><RiCloseLine color="#242424" 
  size={32} onClick={()=>{setToggleShoppingCart(false)}}/></div>
</div>

<div className={`shoppping__cart-container ${Object.keys(userData).length > 0 ? "overflowy-auto" : "overflowy-hidden" }`}>
{userData && Object.keys(userData).length > 0 ? (
  userData.map((cartItem)=>
    <div className="shopping__cart-items" key={cartItem.id} >
      <div className="shopping__cart-img-title-container">
      <Link  to={'/products/' + cartItem.season +'/' + cartItem.id}>
      <div className="shopping__cart-items-img" onClick={()=>{setToggleShoppingCart(false)}}>
        <img src={cartItem.image} alt="" />
      </div>
      </Link>
      <div className=" shopping__cart-items-title ">
      <span className="fw-700-bold margin-b-0">{cartItem.name}</span>
      <div className="dflex gap flex-wrap ">
      <div>
      <span className="clr-dim-100 font-size-500">Rs.{cartItem.discount > 0 ? cartItem.discountPrice : cartItem.price}</span>
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
        <button className="fw-700-bold " onClick={()=>{handleSub(cartItem.id,cartItem.quantity)}}>-</button>
        <span>{cartItem.quantity}</span>
        <button className="text-color-400 fw-700-bold" onClick={()=>{handleAdd(cartItem.id,cartItem.quantity)}}>+</button>
      </div>
    </div> 
    
  )
) 
:(
<div className="shoppping__cart-empty " >
<div><RiShoppingBasketLine color="#242424" size={50}/></div>
<h3 className="font-size-400 fw-500-bold text-capital">your cart is empty</h3>
</div>
)
}
</div>

<div className="checkout_container">
<div className="dflex jc-space-between padding-block-1 clr-dim-100 font-size-500 ">
<span className="text-capital font-size-500 ">total</span>
<span className="fw-700-bold">Rs. {total.toLocaleString()}</span></div>

<Link to={"/checkout"+"#Navbar"} className={`${Object.keys(userData).length > 0 ? "":"disable-link"}`}>
<button data-type={Object.keys(userData).length > 0 ? "valid":"invalid"} 
disabled={Object.keys(userData).length === 0} onClick={()=>{setToggleShoppingCart(false)}}>
<div className="cursor-pointer"><RiShoppingBasketLine color="#fff" size={25}/></div>
<span>checkout</span>
</button>
</Link>
</div>
</div>
</div>
)}


<div className="navbar_bottom ">
<Menu />
</div>

{toggleMenu && (
<div className="nav-sidebar__container">
<div role="presentation" 
className="navbar-sidebar__backdrop" 
onClick={()=>{setToggleMenu(false); }}></div>

<div className="nav-sidebar ">
<div>
<div className="nav-sidebar__brand">
<Link to="/"><img src={logo} alt="" onClick={()=>{setToggleMenu(false)}}/></Link>
<div className="[ dflex align-item-center gap ]">
<RiSunLine color="#242424" size={35} className="cursor-pointer"/>
<RiCloseLine color="#242424" size={55} onClick={()=>{setToggleMenu(false)}} 
className="cursor-pointer"/></div>
</div>
<Menu />
</div>
<div className="dflex padding-12 jc-space-between border-top-1">
<div className="flow">
<div><RiFacebookBoxFill color="#242424"size={25} 
className="cursor-pointer"/></div>
<div><RiTwitterFill color="#242424" size={25} 
className="cursor-pointer"/></div>
<div><RiInstagramFill color="#242424" size={25} 
className="cursor-pointer"/></div>
<div><RiPinterestFill color="#242424" size={25} 
className="cursor-pointer"/></div>
</div>
<div>
<div className="dflex gap-1">
 <div><RiPhoneFill color="#242424" size={20} 
className="cursor-pointer"/></div><span>+9231358525</span></div>
</div>
</div>
</div>
</div>
)}
</div>
</div>


     );
}
 
export default Navbar;