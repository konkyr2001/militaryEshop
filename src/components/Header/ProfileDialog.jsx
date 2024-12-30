import { forwardRef } from "react";
import "./ProfileDialog.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const ProfileDialog = forwardRef(({ handleProfile }, ref) => {
  const passwordRef = useRef(null);
  const [icon, setIcon] = useState("fa-eye");
  function handlePassword() {
    if (!passwordRef.current) {
      return;
    }
    passwordRef.current.type === "password"
      ? (passwordRef.current.type = "text")
      : (passwordRef.current.type = "password");

    setIcon((prevState) => {
      return prevState === "fa-eye" ? "fa-eye-slash" : "fa-eye";
    });
    passwordRef.current.focus();
  }

  return (
    <div
      ref={ref}
      className="absolute top-[50px] -right-10 hidden z-50 bg-white shadow-md rounded-lg"
    >
      <div className="triangle-up border-b-gray-300 border-b-[15px] absolute right-9 -top-[0.9rem]"></div>
      <div className="p-5 border border-gray-300 rounded-lg min-w-64">
        <form>
          <fieldset className="flex flex-col gap-3 text-[0.9rem]">
            <input
              placeholder="Enter your email"
              className="border rounded-sm p-2 w-full tracking-wide"
              type="email"
              aria-label="Email"
              required
            />
            <span className="relative">
              <input
                placeholder="Enter your password"
                className="border rounded-sm p-2 pr-8 w-full tracking-wide"
                type="password"
                aria-label="Password"
                ref={passwordRef}
                required
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex justify-center items-center">
                <i className="vertical-line h-5"></i>
                <i onClick={handlePassword} className={`fa-regular ${icon} cursor-pointer`}></i>
              </div>
            </span>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors w-full"
            >
              Login
            </button>
          </fieldset>
        </form>
        <p className="mt-4 text-center text-sm">
          New to this site?{" "}
          <Link
            to="/signup"
            onClick={handleProfile}
            className="text-blue-600 hover:underline font-semibold"
          >
            Register!
          </Link>
        </p>
      </div>
    </div>
  );
});

export default ProfileDialog;
