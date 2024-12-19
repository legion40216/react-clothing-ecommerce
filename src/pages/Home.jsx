import { Carousel, Latestproducts,Viewgallery} from "../components";


const Home = ({collectionData,RealData,handleLoad}) => {
    return ( 
   <div onLoad={handleLoad}>
        <Carousel />
        <Latestproducts collectionData={collectionData} RealData={RealData}/>
        <Viewgallery />
        </div>  
     );
}
 
export default Home;