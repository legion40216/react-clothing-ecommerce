import { Gallery } from "../components";

const Collection = ({RealData,handleLoad}) => {
    return ( 
    <div onLoad={handleLoad}>
    <Gallery  RealData={RealData} />  
    </div>
        );
}
 
export default Collection;