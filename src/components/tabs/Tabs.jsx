import './tabs.css'

const Tabs = ({categories,getRadioProps}) => {

    return ( 
       
         <div className='radiobtn'>
          <input {...getRadioProps(categories.categorie, categories.categorie)} />
          <label  htmlFor={categories.categorie}>{categories.categorie}</label>
          </div>
   
     );
}
 
export default Tabs;