import './gallery.css'
import { RiArrowDownSLine } from 'react-icons/ri'
import { useState ,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link';
import Breadcrum from '../breadcrums/Breadcrum'
import ProgressiveImg from '../progressiveImg/ProgressiveImg';

const Gallery = ({RealData}) => {
  const { id } = useParams()
  const [toggleMenu, setToggleMenu] = useState(false)
  
  const [sortData, setSortData ]= useState()
  const [sortData2, setSortData2] = useState()

  const [checked, checkedState] =useState("Featured")
  const { useCallback } = require("react")

    function filterdSeason () {
    if(id === "new arrivals")
    { return RealData.filter((cartItem)=>{return cartItem.new === true }) }

    else if(id === "sale")
    {
     return RealData.filter((cartItem)=>{return  cartItem.discount > 0}) 
    }

    else
    {
      return RealData.filter((cartItem)=>{return  cartItem.season === id})
    
    }
  }

  const getSortProps = useCallback((value) => {
    return {
      className: checked === value ? "gallery__sort-checked":"",
      onClick: () => 
      {checkedState(value)
       setToggleMenu(false)
      }
    };
  }, [checked]);

  useEffect(()=>{
    if(sortData){
    if(checked === "Price, low to high") {setSortData2(sortPriceLow(sortData))}
    if(checked === "Price, high to low") {setSortData2(sortPriceGreater(sortData))}
    if(checked === "Featured" ) { setSortData2(sortFeatured(sortData)) }
  }
  },[checked,sortData])
 
  useEffect(()=>{
    if(RealData)
    {
      setSortData(filterdSeason())
    }
    
  },[id,RealData])
  
  function sortPriceLow(sortData){
    return [...sortData].sort(function(c1, c2)
    {
      if(c1.price > c2.price){
        return 1;
      }
      else{
        return -1;
      }
    })
  }
  
  function sortPriceGreater(sortData){
    return [...sortData].sort(function(c1, c2)
     {
       if(c1.price < c2.price){
         return 1;
       }
       else{
         return -1;
       }
     })
   }
  
   function sortFeatured(sortData){
    return [...sortData].sort(function(c1)
     {
       if(c1.new === false){
         return 1;
       }
       else{
         return -1;
       }
     })
   }
 

    return ( 
        <div className='gallery'>
            <div className='[ gallery__header container margin-b-3 ]'>
            <Breadcrum coll={id} />
            <h1 className='[ text-capital padding-top-2 fs-primary-highlight margin-b-3 ]'>
              {id}-<span className=''>Collection-2018</span>
            </h1>
            <div className="gallery__options">
              <div className='gallery__sort'>
                <div className='gallery__sort-container'>
                <span className='[ text-capital font-size-300 ]'>sort by</span>
                <button onClick={()=>{setToggleMenu(!toggleMenu)}} >
                  <span>{checked}</span> 
                  <div><RiArrowDownSLine color="#242424" size={22} 
                  className={toggleMenu ? "ArrowDownSLine" :""} /></div>
                </button>
                </div>
            
               {toggleMenu && 
               <ul className='gallery__sort-choices' >
                <li {...getSortProps("Featured",sortData)}>Featured</li>
                <li {...getSortProps("Price, low to high",sortData)}>Price, low to high</li>
                <li {...getSortProps("Price, high to low",sortData)}>Price, high to low</li>
                </ul>
                } 
                </div>
            </div>
            </div>

            <div className='[ gallery__grid ][ container margin-b-4 ]'>
           { !sortData2 && <div>Loading...</div>}
           {
           !sortData2 ? (<div>Loading...</div>)  :
           (sortData2.map((product) => (
              <div key={product.id} className="gallery__card">
                <Link to={'/products/' + id +'/' + product.id + '#Navbar'}>
         
                <ProgressiveImg src={product.image} productNew={product.new}  id={id}  productDiscount= {product.discount}/>
                <div className="gallery__card-details">
                  <span>{product.name}</span>
                  <span>Rs.{product.price.toLocaleString()}</span>
                </div>
                </Link>
              </div>
             
            ))
            )
          }
            </div>
        </div>
     );
}
 
export default Gallery;