import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

function NoAccountModal({ imageRef, setIsDialogOpen }) {
  const divRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        divRef &&
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
  }, []);
  return (
    <div ref={divRef} className="absolute top-[50px] -right-10 z-50 bg-white shadow-md rounded-lg">
      <div className="triangle-up border-b-gray-300 border-b-[15px] absolute right-[38px] -top-[0.9rem]"></div>
      <div className="p-5 border border-gray-300 rounded-lg min-w-64 max-w-md">
        <p className="text-base text-center">
          No Account yet,
          <Link to={"/signup"} className={`ml-1 text-blue-600 hover:underline font-semibold`}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default NoAccountModal;
