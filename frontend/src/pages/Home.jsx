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
import { useContext, useEffect, useState } from "react";
import { getUser } from "../services/user";
import { UserContext } from "../App";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

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
        localStorage.setItem("rememberEmail", email);
        localStorage.setItem("rememberPassword", password);
        console.log(localStorage.getItem("rememberEmail"));
      } else {
        localStorage.setItem("remember", false);
        localStorage.removeItem("rememberEmail");
      }
      console.log("Remember me: " + location.state.remember);
    }
  }, [location.state]);

  // when component get opened it checks if the user is remembered and log him in
  useEffect(() => {
    async function getRememberedUser() {
      // if rememberEmail doesnt exists then it returns null = no user
      const email = localStorage.getItem("rememberEmail");
      try {
        const currentUser = await getUser(email);
        console.log("currentUser: ", currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }
    console.log(localStorage);
    getRememberedUser();
  }, []);

  return (
    <>
      {/* <Header user={user} /> */}
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
