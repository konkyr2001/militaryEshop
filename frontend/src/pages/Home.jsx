import ShopAll from "../components/ShopAll/ShopAll";
import ShopSection from "../components/ShopSection/ShopSection";
import Sponsors from "../components/Sponsors/Sponsors";
import BestSelling from "../components/BestSelling/BestSelling";
import Categories from "../components/Categories/Categories";
import Icons from "../components/Services/Services";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getUser } from "../services/user";
import { UserContext } from "../App";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  // CURRENT USED ONLY ON REDIRECT (LOGIN, SIGNUP)
  // every time the component gets called with a parameter, it either
  // logs in the user or displays the default home page
  useEffect(() => {
    if (location.state) {
      const { id, email, password, role, remember, favourites, cart } = location.state;
      setUser({
        id,
        email,
        password,
        role,
        favourites,
        cart,
      });
      if (remember) {
        localStorage.setItem("remember", true);
        localStorage.setItem("rememberID", id);
        localStorage.setItem("rememberEmail", email);
        localStorage.setItem("rememberPassword", password);
      } else {
        localStorage.clear();
        window.history.replaceState({}, '');
      }
    }
  }, [location.state]);

  // when component get opened it checks if the user is remembered and log him in
  useEffect(() => {
    async function getRememberedUser() {
      // if rememberEmail doesnt exists then it returns null = no user
      const email = localStorage.getItem("rememberEmail");
      if (!email) return;
      try {
        const currentUser = await getUser(email);
        currentUser.password = localStorage.getItem("rememberPassword");
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
    getRememberedUser();
  }, []);

  return (
    <>
      <div className="">
        <div className="w-[90%] m-auto">
          <ShopAll />
          <div className="relative min-h-[300px] font-cabinet mt-44 pb-10">
            <ShopSection />
          </div>
          <Sponsors />
          <div className="min-h-[300px] mt-40 font-cabinet pt-10">
            <BestSelling />
          </div>
        </div>
        <Categories />
        <Icons />
      </div>
    </>
  );
}
export default Home;
