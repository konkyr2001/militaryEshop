import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import profileImg from "../../assets/icons/profile-svgrepo-com.svg";
import shoppingCartImg from "../../assets/icons/shopping-cart-01-svgrepo-com.svg";
import ProfileDialog from "./ProfileDialog";
import Logo from "./Logo";
import LoggedInProfileDialog from "./LoggedInProfileDialog";

function Header({ user }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // using imageRef for modal to use it inside the modal's click listener
  const imageRef = useRef(null);
  return (
    <nav className="w-full">
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
          <li className="h-[30px] pt-1 flex items-center">
            <i className="fa-regular fa-heart text-2xl cursor-pointer"></i>
          </li>
          <li className="h-[30px] flex items-center">
            {/* <i className="fa-solid fa-cart-shopping"></i> */}
            <img className="h-[25px] object-cover pointer" src={shoppingCartImg} />
          </li>
          <li className="h-[30px] flex items-center relative">
            {/* <i className="fa-solid fa-user"></i> */}
            <img
              ref={imageRef}
              className="h-[23px] object-cover pointer"
              src={profileImg}
              onClick={(e) => setIsDialogOpen((prevState) => !prevState)}
            />
            {isDialogOpen && !user && (
              <ProfileDialog imageRef={imageRef} setIsDialogOpen={setIsDialogOpen} />
            )}
            {isDialogOpen && user && (
              <LoggedInProfileDialog
                imageRef={imageRef}
                setIsDialogOpen={setIsDialogOpen}
                user={user}
              />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
