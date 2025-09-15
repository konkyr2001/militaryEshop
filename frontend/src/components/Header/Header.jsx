import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import profileImg from "../../assets/icons/profile-svgrepo-com.svg";
import shoppingCartImg from "../../assets/icons/shopping-cart-01-svgrepo-com.svg";
import ProfileDialog from "./ProfileDialog";
import Logo from "./Logo";
import FavouritesDialog from "./Dialogs/FavouritesDialog";
import CartDialog from "./Dialogs/CartDialog";
import LoggedInProfileDialog from "./LoggedInProfileDialog";
import NoAccountModal from "./Dialogs/NoAccountModal";

function Header() {
  const [user, setUser] = useState({
    email: localStorage.getItem("rememberEmail"),
    password: localStorage.getItem("rememberPassword"),
  });
  const [noAccountDialog1, setNoAccountDialog1] = useState(false);
  const [noAccountDialog2, setNoAccountDialog2] = useState(false);
  const [favouriteDialogOpen, setFavouriteDialogOpen] = useState(false);
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  // using imageRef for modal to use it inside the modal's click listener
  const favouritesImageRef = useRef(null);
  const cartImageRef = useRef(null);
  const profileImageRef = useRef(null);

  function handleFavourties() {
    if (user) {
      setFavouriteDialogOpen(!favouriteDialogOpen);
    } else {
      setNoAccountDialog1(!noAccountDialog1);
    }
    return;
  }

  function handleCart() {
    if (user) {
      setCartDialogOpen(!cartDialogOpen);
    } else {
      setNoAccountDialog2(!noAccountDialog2);
    }
  }
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
          <li className="h-[30px] pt-1 flex items-center relative">
            <i
              className="fa-regular fa-heart text-2xl cursor-pointer"
              onClick={handleFavourties}
              ref={favouritesImageRef}
            ></i>
            {user?.favourites?.length > 0 && (
              <p className="absolute -right-1 top-4">{user?.favourites?.length}</p>
            )}
            {favouriteDialogOpen && (
              <FavouritesDialog
                imageRef={favouritesImageRef}
                setIsDialogOpen={setFavouriteDialogOpen}
                favourites={user.favourites}
              />
            )}
            {noAccountDialog1 && (
              <NoAccountModal imageRef={favouritesImageRef} setIsDialogOpen={setNoAccountDialog1} />
            )}
          </li>
          <li className="h-[30px] flex items-center relative">
            <img
              className="h-[25px] object-cover pointer"
              src={shoppingCartImg}
              onClick={handleCart}
              ref={cartImageRef}
            />
            {user?.cart?.length > 0 && (
              <p className="absolute -right-[7px] top-4">{user?.cart?.length}</p>
            )}
            {cartDialogOpen && (
              <CartDialog
                imageRef={cartImageRef}
                setIsDialogOpen={setCartDialogOpen}
                cart={user.cart}
              />
            )}
            {noAccountDialog2 && (
              <NoAccountModal imageRef={cartImageRef} setIsDialogOpen={setNoAccountDialog2} />
            )}
          </li>
          <li className="h-[30px] flex items-center relative">
            <img
              ref={profileImageRef}
              className="h-[23px] object-cover pointer"
              src={profileImg}
              onClick={(e) => setProfileDialogOpen((prevState) => !prevState)}
            />
            {profileDialogOpen && !user && (
              <ProfileDialog imageRef={profileImageRef} setIsDialogOpen={setProfileDialogOpen} />
            )}
            {profileDialogOpen && user && (
              <LoggedInProfileDialog
                imageRef={profileImageRef}
                setIsDialogOpen={setProfileDialogOpen}
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
