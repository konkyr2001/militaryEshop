import { useContext } from "react";
import { UserContext } from "../App";
const Account = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="w-4/5 flex flex-row h-[500px] border-gray-400 border rounded">
        <div className="flex flex-col w-[450px] gap-[40px] p-10  relative border-r-2 border-gray-200">
          <ul className="w-full h-[180px] left-0 top-0 absolute flex flex-row justify-center items-center gap-4">
            <i class="fa-regular fa-user rounded-[50%] border-4 border-black w-12 h-12 pl-[2px] flex justify-center items-center text-2xl"></i>
            <li className="text-lg font-bold">{user.email}</li>
          </ul>
          <ul className="absolute top-[180px] left-0 w-full h-[320px] px-10 gap-6 flex flex-col">
            <li className="border-gray-400 border rounded p-4 relative">
              My Account
              <div className="triangle-left border-r-gray-400 absolute right-[2px] -top-[1px] border-[29px]"></div>
              <div className="absolute -right-[38px] top-0 w-[42px] h-full bg-gray-400"></div>
            </li>
            <li className="border-gray-400 border rounded p-4">Settings</li>
            <li className="border-gray-400 border rounded p-4">My Products</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
