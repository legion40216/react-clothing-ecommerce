import React from "react";
import './carousel.css'
import Slider from "react-slick";
import banner1 from "../../assets/Web_Banne2.png"
import banner2 from "../../assets/Web_Banner1.png"

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Carousel = () => {

const config = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
  autoplaySpeed: 6000,
  mobileFirst:true,
};
const settings = config;
const products = [
    {

      img: banner1,

    },
    {
  
      img: banner2,
    }]


    return ( 
        <div className="[ header__carousel ] [ container-block margin-b-3 ]">
        <div className="silder">
        <Slider {...settings}>
        {products.map((x, i) => (
            <div key={i} className="header-slide">
              <img src={x.img} alt=""  />
            </div>
          ))}
      </Slider>
        </div>
        </div>
     );
}
 
export default Carousel;