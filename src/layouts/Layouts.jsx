import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

const Layouts = ({ userData, handleAddCart, navlinks }) => (
  <>
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

export default Layouts;
