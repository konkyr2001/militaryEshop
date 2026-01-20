import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function Layout() {
  const location = useLocation();
  const correctPage = !(location.pathname === "/signup") && !(location.pathname === "/login")
  return (
    <>
      {correctPage && (
        <Header />
      )}
      <main>
        <Outlet />
      </main>
      {correctPage && (
        <Footer />
      )}
    </>
  );
}

export default Layout;
