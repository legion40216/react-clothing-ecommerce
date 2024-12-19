import './product.css'
import {RiShoppingBasketLine} from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Breadcrums } from '../../components'

const Product = ({handleAddCart,userData,RealData}) => {
    const { ids,coll } = useParams()
    const [productQun, setProductQun] = useState(null)
    const[productid, setProductid] = useState()
    const[placeProduct, setPlaceProduct] = useState(false)

    const idse = Number(ids)
   
   const handleAdd = () =>{
    if(productQun===null)
    {
      setProductQun(1)
    }
    else{
      setProductQun(productQun + 1)
    }
   }
   
   const handleSub = () =>{
    if(productQun ===null)
    {
      setProductQun(1)
    }
    else{
    if(productQun > 0)
    {
     setProductQun(productQun - 1) 
    }}}

   useEffect(()=>{
   
    handleAddCart(productQun,idse,discountSum,placeProduct)
  },[productQun,placeProduct])

useEffect(()=>{
  if(userData){
   const findQuantity = userData.findIndex(todo =>{
        return todo.id === idse
         })
    if(findQuantity >= 0)
    {
      setProductQun(userData[findQuantity].quantity)
      setPlaceProduct(true)
    }
  else{
    setProductQun(0)
    setPlaceProduct(false)
  }
  }},[userData,idse])

useEffect(()=>{
setProductid( RealData && RealData.find((product)=>{ return product.id === idse}))
},[RealData,idse])

const [discountSum, setdiscountSum] = useState()

useEffect(()=>{

  if(productid && productid.discount> 0)
{
  setdiscountSum(Math.trunc(productid.price-(productid.price*(productid.discount/100))))
}
},[productid])
  
return ( 

<div className='[ container ]'>
<Breadcrums coll={coll}  idse={idse} RealData={RealData} />
<div className='product'>
{!productid ? (<div>Loading...</div>)  : (
<>
<div className='product__image'>
<div className='product__image-new'>
{productid.new&&<span>New</span>}
</div>
<img src={productid.image} alt="" />
</div>
<div className='product__details'>

<div className='product__details-titles'>
<span className='[ margin-b-3 display-block text-capital fw-700-bold  text-color-100 ]'>
    Sneaker Company</span>
<h1 className='[ fs-primary-highlight ]'>{productid.name}</h1></div>

<div>
    <p>hese low-profile sneakers are your perfect casual wear companion. 
    Featuring a durable rubber outer sole, they’ll 
    withstand everything the weather can offer</p>
</div>

<div className='product__details-price'>
    <div className='margin-b-3'>
    <div className='[ dflex align-item-center gap-2 ]'>
 <span className='[ fw-500-bold  font-size-600 ]'>
<span className='[ font-size-500 ]'>Rs.</span>
{productid.discount > 0 ? discountSum : productid.price}</span>
     {productid.discount > 0 &&(
     <span className='[ font-size-400 fw-700-bold discount ]'>
        -{productid.discount}%</span>)
     }
     </div>

     {productid.discount > 0 &&(
     <span className='[ price_line-through font-size-500 ]'>Rs.{productid.price}</span>)
     }
     
     </div>

 <div className='product__details-buttons'>
    <div className='product__details-btns'>
    <button className='btn'onClick={handleSub}>-</button><span>{productQun ? productQun : 0}</span>
    <button className='btn'onClick={handleAdd}>+</button></div>

    <button className='add-cart_btn' data-type={ placeProduct && productQun > 0 || placeProduct === false && productQun === 0  ? "invalid" : ""  }  
    onClick={()=>{setPlaceProduct(true)}} disabled={placeProduct === true && productQun > 0 || placeProduct === false && productQun === 0 }>
     { placeProduct ? <div>Item added</div> : 
     <>
    <div>
    <RiShoppingBasketLine color="#fff" size={25}/>
    </div>
    Add to cart
    </>
     }
    </button>

</div>

</div>

</div>
</>)} 
</div>
</div>
);
}
export default Product;