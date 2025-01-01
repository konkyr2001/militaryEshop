import { useRef, useState } from "react";
import EmailInput from "../components/Shared/EmailInput";
import PasswordInput from "../components/Shared/PasswordInput";
import SubmitButton from "../components/Shared/SubmitButton";
import AlreadyText from "../components/Shared/AlreadyText";
const SignUp = () => {
  const [remember, setRemember] = useState(false);
  const passwordRef = useRef(null);
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center bg-gradient-to-r from-blue-300 to-purple-300">
      <div className="min-w-[30rem] shadow-xl bg-white rounded-xl p-8 font-cabinet">
        <h1 className="font-bold text-2xl text-left w-full">Create an Account</h1>
        <form className="mx-3 mt-6 mb-5">
          <fieldset className="flex justify-center items-center flex-col gap-5">
            <EmailInput placeholder="Enter your email" className="px-4 tracking-wider" />
            <PasswordInput
              placeholder="Enter your password"
              className="px-4 tracking-wider"
              ref={passwordRef}
            />
            <span className="w-full ml-2 flex items-center gap-3">
              <input
                className="h-4 w-4"
                type="checkbox"
                id="remember-me"
                value={remember}
                onChange={() => setRemember((prevState) => !prevState)}
              />
              <label className="text-gray-600" htmlFor="remember-me">
                Remember me
              </label>
            </span>
            <SubmitButton
              buttonText="Sign Up"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-green-600 hover:to-green-700"
            />
          </fieldset>
        </form>
        <AlreadyText to="/login" pText="Already have an account?" linkText="Login!" />
        <AlreadyText to="/" pText="" linkText="Continue as a guest!" linkClass="text-gray-400" />
      </div>
    </div>
  );
};

export default SignUp;
