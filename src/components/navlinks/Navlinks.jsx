import { HashLink as Link } from 'react-router-hash-link';
import './navlinks.css'


const Navlinks = ({navlinks, handleCloseSidebar}) => {
    return ( 
        <>
        {navlinks.map((categories, i) => (
        <li key={i} onClick={handleCloseSidebar}>
         <Link to={'/collection/' + categories.categorie + '#Navbar'}>
         {categories.categorie}</Link>
         </li>
        ))}
         <li  onClick={handleCloseSidebar}>
         <Link to={'/collection/new arrivals' + '#Navbar'}>new arrivals</Link>
         </li>
         <li  onClick={handleCloseSidebar}>
         <Link to={'/collection/sale' + '#Navbar'}>sale</Link>
         </li>
      </>    
     );
}
 
export default Navlinks;