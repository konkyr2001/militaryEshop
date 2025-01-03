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
import { getUser } from "../services/user";

function Home() {
  const [user, setUser] = useState();
  const location = useLocation();

  // when component get opened it checks if the user is remembered and log him in
  useEffect(() => {
    async function getRememberedUser() {
      if (localStorage.getItem("remember") === "true") {
        const email = localStorage.getItem("rememberEmail");
        const user = await getUser(email);
        setUser(user);
        console.log("mpike");
      }
    }
    getRememberedUser();
  }, []);

  // every time the component gets called with a parameter, it either
  // logs in the user or displays the default home page
  useEffect(() => {
    if (location.state) {
      const { email, password, role, remember } = location.state;

      setUser({
        email,
        password,
        role,
      });

      if (remember) {
        localStorage.setItem("remember", true);
        localStorage.setItem("rememberEmail", email);
        console.log(localStorage.getItem("rememberEmail"));
      } else {
        localStorage.setItem("remember", false);
        localStorage.removeItem("rememberEmail");
      }
      console.log(location.state.remember);
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
