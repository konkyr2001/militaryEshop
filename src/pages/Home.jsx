import ShopAll from "../components/ShopAll/ShopAll";
import ShopSection from "../components/ShopSection/ShopSection";
import Sponsors from "../components/Sponsors/Sponsors";
import BestSelling from "../components/BestSelling/BestSelling";
import Categories from "../components/Categories/Categories";
import Icons from "../components/Services/Services";
import Footer from "../components/Footer/Footer";
function Home() {
  return (
    <div className="">
      <div className="w-[90%] m-auto">
        <ShopAll />
        <ShopSection />
        <Sponsors />
        <BestSelling />
      </div>
      <Categories />
      <Icons />
      <Footer />
    </div>
  );
}
export default Home;
