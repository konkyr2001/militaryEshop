import { useState } from "react";
const Tab = ({ children, number, tabOpen, setTabOpen }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      onClick={() => setTabOpen(number)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-gray-400 border rounded pointer p-4 relative hover:text-cyan-600 hover:border-cyan-400 hover:shadow-md transition"
    >
      <span
        className={`${hovered ? "inline-block" : "hidden"} text-cyan-400 font-bold mr-1`}
      >{`>`}</span>
      {children}
      {tabOpen === number && (
        <div
          className={`${hovered ? "border-r-cyan-300" : "border-r-gray-300"} triangle-left absolute right-0 -top-[1px] border-[29px]`}
        ></div>
      )}
    </li>
  );
};

export default Tab;
