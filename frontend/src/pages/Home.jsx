import ShopAll from "../components/ShopAll/ShopAll";
import ShopSection from "../components/ShopSection/ShopSection";
import Sponsors from "../components/Sponsors/Sponsors";
import BestSelling from "../components/BestSelling/BestSelling";
import Categories from "../components/Categories/Categories";
import Icons from "../components/Services/Services";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Loading from "../components/Shared/Loading";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [user, setUser] = useState();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setUser({
        email: location.state.email,
        password: location.state.password,
      });
    }
  }, [location.state]);
  return (
    <>
      <Header user={user} />
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
    </>
  );
}
export default Home;
