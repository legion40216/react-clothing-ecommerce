import './footer.css'
import  Navlinks  from "../navlinks/Navlinks"
import { HashLink as Link } from 'react-router-hash-link';
import {RiFacebookBoxLine,RiTwitterLine,RiInstagramLine,RiPinterestLine,RiArrowUpLine} 
from 'react-icons/ri'
const Footer = ({navlinks}) => {
    return ( 
        

<div className="[ primary-footer__wrapper ] [ padding-block-700 ] [ container ] ">

<a className="primary-footer__logo" href="#">
    <h3>Brandname</h3>
</a>


<ul className="social-list" aria-label="social links">
  <li><RiFacebookBoxLine color="#fff" size={28} 
className="cursor-pointer"/></li>
  <li><RiTwitterLine color="#fff" size={28} 
className="cursor-pointer"/></li>
  <li><RiInstagramLine color="#fff" size={28} 
className="cursor-pointer"/></li>
  <li><RiPinterestLine color="#fff" size={28} 
className="cursor-pointer"/></li>
</ul>

<div className="primary-footer__nav">
  <nav className="footer-nav">
    <ul aria-label="footer" className="flow"  >
    <li><Link to={'/#Navbar'}>Home</Link></li> 
    <Navlinks navlinks={navlinks} />
    </ul>
  </nav>
</div>

  <form className="primary-footer__form" action="" onSubmit={(e)=>{e.preventDefault()}}>
    <label htmlFor="newsletter">
    <input type="email" name="" id="newsletter" placeholder='Sign up for Newsletter'/>
    </label>
    <button className="button"  >Go</button>
 
  </form>
  <p className="primary-footer__copyright">Copyright 2020. All Right Reserved</p>


  <Link to={'#Navbar'}><div className='scroll__up'>
<RiArrowUpLine color="#fff" size={28} 
className="cursor-pointer"/>
</div></Link>

</div>

     );
}
 
export default Footer;