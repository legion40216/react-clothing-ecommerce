import { Link } from "react-router-dom";

const Pagenotfound = () => {
    return ( 
        <div className="pagenotfound">
            <h1 className="font-size-550 text-colorN-100 margin-b-3">Opps... Page could not be found</h1>
             <Link to={"/"}><span className="font-size-500 clr-dim-100 text-decoration-underline">return to homepage</span></Link>
        </div>
     );
}
 
export default Pagenotfound;