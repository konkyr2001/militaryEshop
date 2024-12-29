import ShopAll from "./ShopAll";
import ShopSection from "./ShopSection";
import Sponsors from "./Sponsors";
import BestSelling from "./BestSelling";
import Categories from "./Categories";
import Icons from "./Icons/Icons";
import Footer from "./Footer";
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
