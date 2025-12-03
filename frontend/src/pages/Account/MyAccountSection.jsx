import { useEffect, useRef, useState, useContext } from "react";
import EmailInput from "../../components/Shared/EmailInput";
import PasswordInput from "../../components/Shared/PasswordInput";
import SubmitButton from "../../components/Shared/SubmitButton";
import DeleteButton from "./DeleteButton";
import { getUser, updateUser } from "../../services/user";
import Alert from "@mui/material/Alert";
import { UserContext } from "../../App";

const MyAccountSection = ({ currentUser }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailHover, setEmailHover] = useState(false);
  const [passwordHover, setPasswordHover] = useState(false);
  const [disableEmail, setDisableEmail] = useState(true);
  const emailRef = useRef(null);
  const [disablePassword, setDisablePassword] = useState(true);
  const passwordRef = useRef(null);
  const [formError, setFormError] = useState(null);

  const { user, setUser } = useContext(UserContext);

  const [alert, setAlert] = useState(null);

  const initialUser = {
    email: currentUser.email,
    password: currentUser.password,
  };

  // RUNS WHEN CURRENT USER CHANGES (HEADER TAKES A FEW MILISECONDS)
  // SO THIS EXECUTES SECOND TIME AND CORRECTS THE NULL VALUES
  useEffect(() => {
    setEmail(currentUser.email);
    setPassword(currentUser.password);
    console.log(currentUser)
  }, [currentUser]);

  useEffect(() => {
    if (!alert) return;

    const timer = setTimeout(() => {
      setAlert(null);
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, [alert]);

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, [disableEmail]);

  useEffect(() => {
    if (passwordRef.current) passwordRef.current.focus();
  }, [disablePassword]);

  const changeEmail = () => {
    setDisableEmail(!disableEmail);
    // emailRef.current.focus() should be here but the DOM didnt finish with the hover
    //  yet so we create a useEffect and on disableEmail change it gets called
  };

  const changePassword = () => {
    setDisablePassword(!disablePassword);
    // passwordRef.current.focus() should be here but the DOM didnt finish with the hover
    // yet so we create a useEffect and on disableEmail change it gets called
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (email === initialUser.email && password === initialUser.password) {
      return;
    }

    try {
      if (email !== initialUser.email) {
        const userExists = await getUser(email);
        if (userExists) {
          setFormError("EMAIL");
          return false;
        }
      }
      if (password.length < 5) {
        setFormError("PASSWORD");
        return false;
      }

      // getting the new updated currentUser info
      const updates = {};
      if (email !== initialUser.email) updates.email = email;
      if (password !== initialUser.password) updates.password = password;

      const userUpdate = await updateUser(initialUser, updates);
      if (userUpdate.found) {
        setFormError("");
        setAlert("SUCCESS");
        setUser({
          ...user,
          email: userUpdate.user.email,
          password: password,
        });
        localStorage.setItem("rememberEmail", email);
        localStorage.setItem("rememberPassword", password);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form method="PUT" onSubmit={(e) => handleSubmit(e)} className="w-full mx-20">
      <fieldset className="flex flex-col gap-10 text-[0.9rem]">
        <p className="text-2xl text-blue-700 text-center font-bold">Account information</p>
        {alert === "SUCCESS" && <Alert severity="success">Your changes have been saved!</Alert>}
        <span className="relative">
          <label htmlFor="userEmailProfile" className="tracking-wide text-base">
            Email:
          </label>
          <EmailInput
            ref={emailRef}
            onMouseOver={() => setEmailHover(true)}
            onMouseOut={() => setEmailHover(false)}
            onChange={(e) => setEmail(e.target.value)}
            id="userEmailProfile"
            style={{ borderColor: formError === "EMAIL" ? "red" : "#e5e7eb" }}
            value={`${email}`}
            disabled={disableEmail}
          />
          <span
            onMouseOver={() => setEmailHover(true)}
            onMouseOut={() => setEmailHover(false)}
            onClick={changeEmail}
            className={`absolute top-[23px] right-0 w-[40px] h-[40px] flex items-center justify-center pointer ${emailHover ? "visible" : "hidden"}`}
          >
            {disableEmail && <i title="Edit" className={`fa-solid fa-gears`}></i>}
            {!disableEmail && (
              <i
                onClick={() => setEmail(initialUser.email)}
                title="Cancel"
                className={`fa-solid fa-xmark text-red-500 text-xl w-full h-full flex items-center justify-center`}
              ></i>
            )}
          </span>
          {formError === "EMAIL" && (
            <p className="text-red-500 tracking-wider">Your email already exists</p>
          )}
        </span>
        <span className="relative">
          <label htmlFor="userPasswordProfile" className="tracking-wide text-base">
            Password:
          </label>
          <PasswordInput
            ref={passwordRef}
            onMouseOver={() => setPasswordHover(true)}
            onMouseOut={() => setPasswordHover(false)}
            id="userPasswordProfile"
            value={`${password}`}
            onChange={(e) => setPassword(e.target.value)}
            disabled={disablePassword}
            type={disablePassword ? "password" : "text"}
            style={{ borderColor: formError === "PASSWORD" ? "red" : "#e5e7eb" }}
            hideeye="true"
          />
          <span
            onMouseOver={() => setPasswordHover(true)}
            onMouseOut={() => setPasswordHover(false)}
            onClick={changePassword}
            title="Edit"
            className={`absolute top-[23px] right-0 w-[40px] h-[40px] flex items-center justify-center pointer ${passwordHover ? "visible" : "hidden"}`}
          >
            {disablePassword && <i className={`fa-solid fa-gears`}></i>}
            {!disablePassword && (
              <i
                onClick={() => setPassword(initialUser.password)}
                title="Cancel"
                className={`fa-solid fa-xmark text-red-500 text-xl w-full h-full flex items-center justify-center`}
              ></i>
            )}
          </span>
          {formError === "PASSWORD" && (
            <p className="text-red-500 tracking-wider">Password must be 5 characters minimum</p>
          )}
        </span>
        <SubmitButton
          buttonText="Update Account Information"
          title="Submit"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-green-600 hover:to-green-700"
        />
        <DeleteButton 
          buttonText="Delete user permantly!"
          currentUser={currentUser}
        />
      </fieldset>
    </form>
  );
};

export default MyAccountSection;
