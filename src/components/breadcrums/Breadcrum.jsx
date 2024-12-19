import './breadcrum.css'
import {Link} from 'react-router-dom';
import {RiHome2Fill,RiArrowDropRightLine} from 'react-icons/ri'
import { useState } from 'react';
import { useEffect } from 'react';

const Breadcrum = ({coll, idse,RealData}) => {
const [idName , setidName] = useState(false)
useEffect(()=>{
    if(idse)
    {
        setidName (RealData && RealData.find((product)=>{ return product.id === idse}))
    }
},[idse,RealData])

    return ( 
       
        <div className='breadcrums__navbar  '>
            
                <>
            <ul className='breadcrums__navbar-list'>
           <li> <Link to={'/'}><button><RiHome2Fill color="#242424" size={20} /></button></Link></li>
            <div><RiArrowDropRightLine color="#242424" size={25} /></div>
            <li><Link to={'/collection/'+ coll}><button>{coll}</button></Link></li>
            
            {idse && 
             <>
              {!idName ? (<div>Loading...</div>)  : ( 
                <>
            <div><RiArrowDropRightLine color="#242424" size={20} /></div>
            <li><button>{idName.name}</button></li>
            </>
              )}
            </>
            }
            </ul>
            </>
           
        </div>
      
     );
}
 
export default Breadcrum;