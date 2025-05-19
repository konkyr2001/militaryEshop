import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./App";
import Header from "./components/Header/Header";
function Layout() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  console.log("pathname: ", location.pathname);
  return (
    <>
      {!(location.pathname === "/signup") && <Header user={user} />}
      <Outlet />
    </>
  );
}

export default Layout;
