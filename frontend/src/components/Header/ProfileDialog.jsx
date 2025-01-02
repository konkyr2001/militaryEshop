import { forwardRef } from "react";
import "./ProfileDialog.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkUser } from "../../services/user";
import EmailInput from "../Shared/EmailInput";
import PasswordInput from "../Shared/PasswordInput";
import SubmitButton from "../Shared/SubmitButton";
import AlreadyText from "../Shared/AlreadyText";
import Loading from "../Shared/Loading";

const ProfileDialog = forwardRef(({ handleProfile }, ref) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFound, setUserFound] = useState("true");
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const userExist = await checkUser(email, password);
      if (userExist) {
        setUserFound(true);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/", {
            state: {
              email,
              password,
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
      <div
        ref={ref}
        className="absolute top-[50px] -right-10 hidden z-50 bg-white shadow-md rounded-lg"
      >
        <div className="triangle-up border-b-gray-300 border-b-[15px] absolute right-9 -top-[0.9rem]"></div>
        <div className="p-5 border border-gray-300 rounded-lg min-w-64">
          {!userFound && (
            <p className="text-red-500 mb-3 tracking-wider">
              Email or password are incorrect, please try again
            </p>
          )}
          <form action="POST" onSubmit={handleSubmit}>
            <fieldset className="flex flex-col gap-3 text-[0.9rem]">
              <EmailInput
                className={`${!userFound ? "border-red-300" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                className={`${!userFound ? "border-red-300" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordRef}
              />
              <SubmitButton buttonText="Log in" />
            </fieldset>
          </form>
          <AlreadyText to="/signup" pText="New to this site?" linkText="Sign Up!" />
        </div>
      </div>
    </>
  );
});

export default ProfileDialog;
