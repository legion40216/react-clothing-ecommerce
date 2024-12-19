import './viewgallery.css'
import { HashLink as Link } from 'react-router-hash-link';

const Viewgallery = () => {
    return ( 
        <div className='[ viewgallery__wrapper ] [ container-block ]'>
            <span className='[ fw-700-bold font-size-600 margin-b-2 display-block ]' >#Brandname ON INSTAGRAM</span>
            <p className='[ margin-b-3 ]'>Brandname is Pakistan's leading Menswear Brand</p>
            <Link to={'/collection/new arrivals'+ '#Navbar'}><button className="button" data-type="primary" >view gallery</button></Link>
        </div>
     );
}
 
export default Viewgallery;