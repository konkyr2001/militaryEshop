import AlreadyText from "../components/Shared/AlreadyText";
import EmailInput from "../components/Shared/EmailInput";
import PasswordInput from "../components/Shared/PasswordInput";
import SubmitButton from "../components/Shared/SubmitButton";
import googleIcon from "../assets/icons/google-icon.svg";
import IconButton from "../components/Shared/IconButton";
import facebookIcon from "../assets/icons/facebook-icon.svg";
import emailIcon from "../assets/icons/email-icon.svg";
import { useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { checkUser } from "../services/user";
import Loading from "../components/Shared/Loading";
import RememberMe from "../components/Shared/RememberMe";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [userFound, setUserFound] = useState("true");
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // checkUser returns an object with found and role attributes
      const userExist = await checkUser(email, password);
      if (userExist.found) {
        setUserFound(true);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/", {
            state: {
              email,
              password,
              role: userExist.role,
              remember,
            },
          });
        }, 500);
      } else {
        setUserFound(false);
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setUserFound(false);
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-screen h-screen bg-gray-200 flex justify-center items-center bg-gradient-to-r from-blue-300 to-purple-300">
        <div className="min-w-[30rem] shadow-xl bg-white rounded-xl p-8 font-cabinet">
          <h1 className="font-bold text-center w-full text-4xl mt-2 mb-5">Login</h1>
          <div className="flex justify-between gap-10 px-2 py-1">
            <div className="flex flex-col gap-5 w-[20rem] px-5 py-10">
              <h3 className="text-center font-cabinetMedium text-2xl mb-5">Login</h3>
              {!userFound && (
                <p className="text-red-500 mb-3 tracking-wider">
                  Email or password are incorrect, please try again
                </p>
              )}
              <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                <fieldset className="flex flex-col gap-7">
                  <span className="flex flex-col gap-1 text-base">
                    <label htmlFor="login-email">Email Address</label>
                    <EmailInput
                      placeholder=" "
                      name="email"
                      id="login-email"
                      className={`tracking-wider ${!userFound ? "border-red-300" : ""}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </span>
                  <span className="flex flex-col gap-1 text-base">
                    <label htmlFor="password-email">Password</label>
                    <PasswordInput
                      placeholder=" "
                      name="password"
                      id="password-email"
                      className={`tracking-wider ${!userFound ? "border-red-300" : ""}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      ref={passwordRef}
                    />
                  </span>
                  <RememberMe className={"w-4 h-4"} remember={remember} setRemember={setRemember} />
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
              <IconButton icon={emailIcon} text="Sign up with email" to="/signup" />
            </div>
          </div>
          <AlreadyText to="/" pText="" linkText="Continue as a guest!" linkClass="text-gray-400" />
        </div>
      </div>
    </>
  );
};

export default Login;
