import { useRef, useState } from "react";
import EmailInput from "../components/Shared/EmailInput";
import PasswordInput from "../components/Shared/PasswordInput";
import SubmitButton from "../components/Shared/SubmitButton";
import AlreadyText from "../components/Shared/AlreadyText";
import { useNavigate } from "react-router-dom";
import { signupUser, getUser } from "../services/user";
import Loading from "../components/Shared/Loading";
import RememberMe from "../components/Shared/RememberMe";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DEFAULT");
  const [remember, setRemember] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  async function submitRequirementsCheck() {
    const userExists = await getUser(email);
    if (userExists) {
      setFormError("USER");
      return false;
    } else {
      if (role === "DEFAULT") {
        setFormError("SELECT");
        return false;
      }
      if (password.length < 5) {
        setFormError("PASSWORD");
      }
    }
    setFormError(false);
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const check = await submitRequirementsCheck();
      if (!check) {
        return;
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
          });
        }, 500);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-screen h-screen bg-gray-200 flex justify-center items-center bg-gradient-to-r from-blue-300 to-purple-300">
        <div className="min-w-[30rem] shadow-xl bg-white rounded-xl p-8 font-cabinet">
          <h1 className="font-bold text-2xl text-left w-full">Create an Account</h1>
          <form className="mx-3 mt-6 mb-5" method="POST" onSubmit={(e) => handleSubmit(e)}>
            {formError === "USER" && (
              <p className="text-red-500 mb-3 tracking-wider">
                Email already exists, please try another one
              </p>
            )}
            {formError === "SELECT" && (
              <p className="text-red-500 mb-3 tracking-wider">Please select a role</p>
            )}
            {formError === "PASSWORD" && (
              <p className="text-red-500 mb-3 tracking-wider">
                Password must be 5 characters minimum
              </p>
            )}
            <fieldset className="flex justify-center items-center flex-col gap-5">
              <EmailInput
                placeholder="Enter your email*"
                className={`px-4 tracking-wider ${formError === "USER" ? "border-red-300" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                placeholder="Enter your password*"
                className="px-4 tracking-wider"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordRef}
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`text-gray-400 border rounded-sm p-2 px-3 tracking-wider w-full
                  ${formError === "SELECT" ? "border-red-500" : ""} focus:outline-blue-300 focus:border-blue-500
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
