import { Carousel, Latestproducts, Viewgallery } from "../components";

const Home = ({ collectionData, RealData }) => (
  <div>
    <Carousel />
    <Latestproducts collectionData={collectionData} RealData={RealData} />
    <Viewgallery />
  </div>
);

export default Home;
