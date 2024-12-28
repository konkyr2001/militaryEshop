import { Link } from "react-router-dom";
import Logo from "./Logo";
function Header() {
  return (
    <nav>
      <p className="font-cabinet bg-lightPurple text-center p-3 text-white">
        New here? Save 20% with code: YR24
      </p>
      <div className="w-[90%] m-auto flex py-8 items-center">
        <ul className="flex space-x-8">
          <li className="">
            <Link to="/">
              <Logo />
            </Link>
          </li>
          <li>
            <Link to="/">Women</Link>
          </li>
          <li>
            <Link to="/product">Men</Link>
          </li>
          <li>
            <Link to="/contact">Kids</Link>
          </li>
          <li>
            <Link to="/contact">Classic</Link>
          </li>
          <li>
            <Link to="/contact">Sport</Link>
          </li>
          <li>
            <Link to="/contact">Sale</Link>
          </li>
        </ul>
        <ul className="flex ml-auto space-x-8">
          <li>
            <i className="fa-solid fa-heart"></i>
          </li>
          <li>
            <i className="fa-solid fa-cart-shopping"></i>
          </li>
          <li>
            <i className="fa-solid fa-user"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
