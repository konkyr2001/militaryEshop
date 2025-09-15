import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Shared/Loading";

function LoggedInProfileDialog({ imageRef, setIsDialogOpen, user }) {
  const [isLoading, setIsLoading] = useState(false);
  const divRef = useRef();

  function logout() {
    setIsLoading(true);
    localStorage.clear();
    const info = JSON.parse(localStorage.getItem("info"));
    const newInfo = info.item;
    localStorage.setItem(info, JSON.stringify(newInfo));
    setTimeout(() => {
      location.reload();
      setIsLoading(false);
    }, 200);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        divRef.current &&
        !divRef.current.contains(event.target) &&
        !imageRef.current.contains(event.target)
      ) {
        setIsDialogOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  return (
    <>
      {isLoading && <Loading />}
      <div
        ref={divRef}
        className="absolute top-[50px] -right-10 z-50 bg-white shadow-md rounded-lg"
      >
        <div className="triangle-up border-b-gray-300 border-b-[15px] absolute right-9 -top-[0.9rem]"></div>
        <div className="p-5 border border-gray-300 rounded-lg min-w-64">
          <ul className="pl-2 flex flex-col gap-2">
            <li
              className={`text-black font-bold m-auto ${user.role === "seller" ? "text-red-300" : "text-blue-300"}`}
            >
              {user.email}
              <br></br>
              {user.password}
              <br></br>
              {user.role}
            </li>
            <li className="hover:underline decoration-blue-500 cursor-pointer">
              <Link to={`/account/${user.id}`}>My Account</Link>
            </li>
            <li className="hover:underline decoration-blue-500 cursor-pointer">
              <Link>Orders</Link>
            </li>
            {user.role === "seller" && (
              <li className="hover:underline decoration-blue-500 cursor-pointer">
                <Link>My Products</Link>
              </li>
            )}
            <li className="hover:underline decoration-red-500 text-red-500 cursor-pointer">
              <Link onClick={logout}>Log out</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default LoggedInProfileDialog;
