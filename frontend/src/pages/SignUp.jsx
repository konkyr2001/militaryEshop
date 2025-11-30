import { useRef, useState } from "react";
import EmailInput from "../components/Shared/EmailInput";
import PasswordInput from "../components/Shared/PasswordInput";
import SubmitButton from "../components/Shared/SubmitButton";
import AlreadyText from "../components/Shared/AlreadyText";
import { useNavigate } from "react-router-dom";
import { signupUser, getUser } from "../services/user";
import Loading from "../components/Shared/Loading";
import RememberMe from "../components/Shared/RememberMe";
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DEFAULT");
  const [remember, setRemember] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  async function userSignUpProgress() {
    try {
      const userExists = await getUser(email);
        console.log("mpikeeee")
      if (userExists) {
        setEmailError("Email already exists, please try another one");
        return false;
      }
      const userCreated = await signupUser(email, password, role);
      if (userCreated) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/", {
            state: {
              email,
              password,
              role,
              remember,
            },
            replace: true
          });
        }, 500);
        setFormError(false);
        return true;
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }

  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!checkInputs(event)) {
      return;
    }
    userSignUpProgress();
  }

  function checkInputs(event) {
    handleInvalidEmail(event);
    handleInvalidPassword(event);
    handleInvalidRole(event);

    if (!handleInvalidEmail(event) && !handleInvalidPassword(event) && !handleInvalidRole(event)) {
      return true;
    } else {
      return false;
    }
  }

  function handleInvalidEmail(event) {
    event.preventDefault();
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!email.match(emailRegex)) {
      setEmailError("Invalid Email Format");
      return true;
    } else {
      setEmailError(false);
      return false;
    }
  }

  function handleInvalidPassword(event) {
    event.preventDefault();
    if (password.length < 5) {
      setPasswordError("Password must be 5 characters minimum");
      return true;
    } else if (!password.match(/[a-zA-Z]/)) {
      setPasswordError("Password should contains atleast 1 character");
      return true;
    } else if (!password.match(/[0-9]/)) {
      setPasswordError("Password should contains atleast 1 number");
      return true;
    } else {
      setPasswordError(false);
      return false;
    }
  }

  function handleInvalidRole() {
    if (role === "DEFAULT") {
      setRoleError("Please select a role");
      return true;
    } else {
      setRoleError(false);
      return false;
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-screen h-screen bg-gray-200 flex justify-center items-center bg-gradient-to-r from-blue-300 to-purple-300">
        <div className="min-w-[30rem] shadow-xl bg-white rounded-xl p-8 font-cabinet">
          <h1 className="font-bold text-2xl text-left w-full">Create an Account</h1>
          <form className="mx-3 mt-6 mb-5" method="POST" onSubmit={(e) => handleSubmit(e)}>
            <fieldset className="flex justify-center items-center flex-col gap-5 text-left">
              <span className="w-full">
                <EmailInput
                  placeholder="Enter your email*"
                  className={`px-4 tracking-wider ${emailError ? "border-red-500" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onInvalid={(e) => e.preventDefault()}
                />
                {emailError && (
                  <p className="error-signup">
                    {emailError}
                  </p>
                )}
              </span>
              <span className="w-full">
                <PasswordInput
                  placeholder="Enter your password*"
                  className={`px-4 tracking-wider ${passwordError ? "border-red-500" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onInvalid={(e) => e.preventDefault()}
                  ref={passwordRef}
                />
                {passwordError && (
                  <p className="error-signup">
                    {passwordError}
                  </p>
                )}
              </span>
              <span className="w-full">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`text-gray-400 border rounded-sm p-2 px-3 tracking-wider w-full
                  ${roleError ? "border-red-500" : ""} focus:outline-blue-300 focus:border-blue-500
                   ${role === "seller" ? "bg-red-200 text-gray-600" : role === "customer" ? "bg-blue-200 text-gray-600" : "text-gray-400"}`}
                  required
                >
                  <option value="DEFAULT" disabled className="text-gray-400 bg-gray-100">
                    Choose your role*
                  </option>
                  <option value="customer" className="text-gray-600 bg-blue-200 hover:bg-blue-200">
                    Customer
                  </option>
                  <option value="seller" className="text-gray-600 bg-red-200 hover:bg-blue-200">
                    Seller
                  </option>
                </select>
                {roleError && (
                  <p className="error-signup">{roleError}</p>
                )}
              </span>
              <RememberMe className={"w-4 h-4"} remember={remember} setRemember={setRemember} />
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
    </>
  );
};

export default SignUp;
