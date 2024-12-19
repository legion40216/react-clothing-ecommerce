import { useState } from "react";

const ProgressiveImg = ({src, productNew, id,productDiscount}) => {
  const [imageOnLoad, setImageOnLoad] = useState(false)

    return (
      <>
      <div className={`gallery__card-new ${imageOnLoad ?"":"hidden"}`}>
      {productNew&&<span>New</span>}
      </div>
      <div className={`product__image-discount ${imageOnLoad ?"":"hidden"}`}>
      { id === "sale" ? (<span>-{productDiscount}%</span>): <></>}
      </div>
      {!imageOnLoad && <div>Loading...</div>} 
      <img src={src} alt="" onLoad={()=>{setImageOnLoad(true)}}
      className={` ${imageOnLoad ?"":"hidden"}`} />
      </>
    );
  };
 
export default ProgressiveImg;