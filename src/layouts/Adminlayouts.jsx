import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom";
const Adminlayouts = () => {
    return ( 
      <>
        <header>
            <div className="admin__nav">
                <div className="admin__nav-wrapper">
                    <h1 className="font-size-600 margin-b-1">Admin panel</h1>
                    <div className="dflex gap">
                    <span><Link to={"/admin"}>home</Link></span>
                    <span><Link>create</Link></span>
                    <span><Link>update/delete</Link></span>
                    </div>
                </div>
            </div>
        </header>
        <Outlet />
        </>
     );
}
 
export default Adminlayouts;