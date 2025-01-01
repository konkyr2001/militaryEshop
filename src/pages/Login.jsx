import AlreadyText from "../components/Shared/AlreadyText";
import EmailInput from "../components/Shared/EmailInput";
import PasswordInput from "../components/Shared/PasswordInput";
import SubmitButton from "../components/Shared/SubmitButton";
import googleIcon from "../assets/icons/google-icon.svg";
import IconButton from "../components/Shared/IconButton";
import facebookIcon from "../assets/icons/facebook-icon.svg";
import emailIcon from "../assets/icons/email-icon.svg";
import { useRef } from "react";

const Login = () => {
  const passwordRef = useRef(null);

  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center bg-gradient-to-r from-blue-300 to-purple-300">
      <div className="min-w-[30rem] shadow-xl bg-white rounded-xl p-8 font-cabinet">
        <h1 className="font-bold text-center w-full text-4xl mt-2 mb-5">Login</h1>
        <div className="flex justify-between gap-10 px-2 py-1">
          <div className="flex flex-col gap-5 w-[20rem] px-5 py-10">
            <h3 className="text-center font-cabinetMedium text-2xl mb-5">Login</h3>
            <form>
              <fieldset className="flex flex-col gap-7">
                <span className="flex flex-col gap-1 text-base">
                  <label htmlFor="login-email">Email Address</label>
                  <EmailInput
                    placeholder=" "
                    name="email"
                    id="login-email"
                    className="tracking-wider"
                  />
                </span>
                <span className="flex flex-col gap-1 text-base">
                  <label htmlFor="password-email">Password</label>
                  <PasswordInput
                    placeholder=" "
                    name="password"
                    id="password-email"
                    className="tracking-wider"
                    ref={passwordRef}
                  />
                </span>
                <SubmitButton buttonText="Log in" className=" py-3 px-6 rounded-lg font-bold" />
              </fieldset>
            </form>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="h-full border-l-2 border-gray-300"></div>

            <p className="py-5 font-cabinetMedium text-xl">OR</p>
            <div className="h-full border-l-2 border-gray-300"></div>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 w-[20rem]">
            <IconButton icon={googleIcon} text="Continue with Google" />
            <IconButton icon={facebookIcon} text="Continue with Facebook" />
            <IconButton icon={emailIcon} text="Sign up with email" />
          </div>
        </div>
        <AlreadyText to="/" pText="" linkText="Continue as a guest!" linkClass="text-gray-400" />
      </div>
    </div>
  );
};

export default Login;
