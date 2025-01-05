import "./ProfileDialog.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../../services/user";
import EmailInput from "../Shared/EmailInput";
import PasswordInput from "../Shared/PasswordInput";
import SubmitButton from "../Shared/SubmitButton";
import AlreadyText from "../Shared/AlreadyText";
import Loading from "../Shared/Loading";
import RememberMe from "../Shared/RememberMe";

function ProfileDialog({ imageRef, setIsDialogOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [userFound, setUserFound] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const divRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle clicks outside the div AND the profile image
    function handleClickOutside(event) {
      if (
        divRef.current &&
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
  }, [divRef]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
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
              favourites: userExist.favourites,
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
      <div
        ref={divRef}
        className="absolute top-[50px] -right-10 z-50 bg-white shadow-md rounded-lg"
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
              <RememberMe remember={remember} setRemember={setRemember} className={"w-3 h-3"} />
              <SubmitButton buttonText="Log in" />
            </fieldset>
          </form>
          <AlreadyText to="/signup" pText="New to this site?" linkText="Sign Up!" />
        </div>
      </div>
    </>
  );
}

export default ProfileDialog;
