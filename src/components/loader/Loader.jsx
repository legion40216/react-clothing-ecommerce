import './loader.css'
import logo from '../../assets/logo.svg' 
import logoreact from '../../assets/logoreact.svg' 
import logosupa from '../../assets/supabase-logo-icon.svg' 
import logorouter from '../../assets/react-router-mark-color-inverted.svg' 

const Loader = ({load}) => {
    
    return (
        <>
    <div className={`loader ${ load ? "":"loadclear"}`}>
    <div className='loader_container flow2'>
    <div className='loader_logo'>
    <img src={logo} alt="" />
    </div> 
   
     </div>
     <div className='loader_powerd'>
    <span ><span className='text-capital text-italic'>powered</span> By</span>
    <div className='loader_powerd-imgs'>
    <div className='img-wrapper'>
    <img src={logoreact} alt=""  />
    <p>React</p>
    </div>
    <div className='img-wrapper'>
    <img src={logosupa} alt="" width= "3.5rem" />
    <p>Supabase</p>
    </div>
    <div className='img-wrapper routerimg'>
    <img src={logorouter} alt="" />
    <p>React-Router</p>
    </div>
    </div>
    </div>
    </div>
    </>
    );
}

export default Loader;