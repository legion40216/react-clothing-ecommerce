import { Outlet } from "react-router-dom"
import { Navbar,Footer,Loader } from "../components";

const Layouts = ({userData, handleAddCart, navlinks, load}) => {
    return ( 
<>
<Loader load={load}></Loader>
<header className="primary-header">
 <Navbar navlinks={navlinks} userData={userData} handleAddCart={handleAddCart} />
 </header>
 <main>
 <Outlet />
</main>
 <footer className="[ bg-neutral-300 ]">
  <Footer navlinks={navlinks} />
 </footer>
 </>
     );
}
 
export default Layouts;