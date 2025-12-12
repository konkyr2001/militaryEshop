import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import Tab from "./Tab";
import MyAccountSection from "./MyAccountSection";
import Orders from "./Orders";

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [tabOpen, setTabOpen] = useState("1"); // first tab by default

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="w-4/5 max-w-[1300px] flex flex-row h-[500px] border-gray-400 border rounded">
        <div className="flex flex-col w-[450px] gap-[40px] p-10  relative border-r-2 border-gray-200">
          <ul className="w-full h-[180px] left-0 top-0 absolute flex flex-row justify-center items-center gap-4">
            <i className="fa-regular fa-user rounded-[50%] border-4 border-black w-12 h-12 pl-[2px] flex justify-center items-center text-2xl"></i>
            {user && <li className="text-lg font-bold">{user.email}</li>}
          </ul>
          <ul className="absolute top-[180px] left-0 w-full h-[320px] px-10 gap-6 flex flex-col">
            <Tab tabOpen={tabOpen} setTabOpen={setTabOpen} number="1">
              <i className="fa-solid fa-user mr-2"></i>
              My Account
            </Tab>
            <Tab tabOpen={tabOpen} setTabOpen={setTabOpen} number="2">
              <i className="fa-solid fa-basket-shopping mr-2"></i>
              Orders
            </Tab>
            {user && user.role === "seller" && (
              <Tab tabOpen={tabOpen} setTabOpen={setTabOpen} number="3">
                <i className="fa-solid fa-shop mr-2"></i>
                My Products
              </Tab>
            )}
          </ul>
        </div>
        <div className="w-full max-w-[500px] m-auto h-[90%] flex justify-center items-center">
          {tabOpen == 1 && <MyAccountSection currentUser={user} />}
          {tabOpen == 2 && <Orders currentUser={user} />}
        </div>
      </div>
    </div>
  );
};

export default Account;
