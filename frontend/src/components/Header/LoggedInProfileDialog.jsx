import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Shared/Loading";

const LoggedInProfileDialog = forwardRef(({ handleLoggedInProfile, user }, ref) => {
  const [isLoading, setIsLoading] = useState(false);
  function logout() {
    setIsLoading(true);
    setTimeout(() => {
      location.reload();
      setIsLoading(false);
    }, 200);
  }

  return (
    <>
      {isLoading && <Loading />}
      <div
        ref={ref}
        className="absolute top-[50px] -right-10 hidden z-50 bg-white shadow-md rounded-lg"
      >
        <div className="triangle-up border-b-gray-300 border-b-[15px] absolute right-9 -top-[0.9rem]"></div>
        <div className="p-5 border border-gray-300 rounded-lg min-w-64">
          <ul className="pl-2 flex flex-col gap-2">
            <li className="text-black font-bold m-auto">{user.email}</li>
            <li className="hover:underline decoration-blue-500 cursor-pointer">
              <Link>My Account</Link>
            </li>
            <li className="hover:underline decoration-blue-500 cursor-pointer">
              <Link>Orders</Link>
            </li>
            <li className="hover:underline decoration-blue-500 cursor-pointer">
              <Link>Settings</Link>
            </li>
            <li className="hover:underline decoration-blue-500 cursor-help">
              <Link>Help</Link>
            </li>
            <li className="hover:underline decoration-red-500 text-red-500 cursor-pointer">
              <Link onClick={logout}>Log out</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
});

export default LoggedInProfileDialog;
