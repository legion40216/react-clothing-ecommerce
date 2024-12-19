import { useState, useEffect } from 'react';
import './latestproducts.css'
import Tabs from "../tabs/Tabs";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Latestproducts = ({collectionData , RealData}) => {

    const config = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: false,
              dots: false
            }
          },
           {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
              dots: true
            }
           },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: true,
            }
          },
    
        ]
      }
  const settings = config;
  
  const [checked, checkedState] =useState("summer")
  const [sortData, setSortData] = useState()
  const [sortData2, setSortData2] = useState()
  const { useCallback } = require("react")
    
  const getRadioProps = useCallback((id, value) => {
    return {
      id,
      value,
      type: "radio",
      hello:"products",
      checked: checked === value, 
      onChange: () => checkedState(value),
    };
  }, [checked]);

  useEffect(()=>{
    setSortData(RealData && RealData.filter((cartItem)=>{return  cartItem.season === checked}))
},[checked,RealData])

  useEffect(()=>{
    if(sortData){
    setSortData2(sortFeatured(sortData))
    }
},[sortData])
  
  function sortFeatured(sortData){
    return [...sortData].filter(function(c1)
     {
       if(c1.new === true){
         return true;
       }
   })
  }
    return ( 
        <div className="[ lastestproduct_header__slider ] [ container margin-b-6 ]">
            <h1 className="[ margin-b-3 text-capital text-align-center fs-primary-heading ]">
              latest products</h1>
            <div className="[ products__tabs ] [ margin-b-2 ]">
            {collectionData.categories.map((categories, i) => (
            <Tabs key={i} categories={categories} getRadioProps={getRadioProps} />
            ))}
            </div>

        <div className="latestproducts_silder">
        <Slider {...settings}>
        { !sortData2 && <div>Loading...</div>}
        {sortData2 && sortData2.map((x) => (
          <div key={x.id} className="padding-6">
            <Link to={'/products/' + checked +'/' + x.id}>
            <div  className="latestproducts__card">
              <div className="latestproducts__card-new">
              {x.new&&<span>New</span>}
              </div>
              <img src={x.image} alt=""/>
              <div className="latestproducts__card-details">
                <span className='text-capitalize'>{x.name}</span>
                <span>Rs.{x.price}</span>
              </div>
            </div>
            </Link>
            </div>
          ))}
      </Slider>


        </div>
        </div>
    );
}
 
export default Latestproducts;