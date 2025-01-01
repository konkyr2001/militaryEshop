import { forwardRef } from "react";
import "./ProfileDialog.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import EmailInput from "../Shared/EmailInput";
import PasswordInput from "../Shared/PasswordInput";
import SubmitButton from "../Shared/SubmitButton";
import AlreadyText from "../Shared/AlreadyText";

const ProfileDialog = forwardRef(({ handleProfile }, ref) => {
  const passwordRef = useRef(null);

  return (
    <div
      ref={ref}
      className="absolute top-[50px] -right-10 hidden z-50 bg-white shadow-md rounded-lg"
    >
      <div className="triangle-up border-b-gray-300 border-b-[15px] absolute right-9 -top-[0.9rem]"></div>
      <div className="p-5 border border-gray-300 rounded-lg min-w-64">
        <form>
          <fieldset className="flex flex-col gap-3 text-[0.9rem]">
            <EmailInput />
            <PasswordInput ref={passwordRef} />
            <SubmitButton buttonText="Log in" />
          </fieldset>
        </form>
        <AlreadyText to="/signup" pText="New to this site?" linkText="Sign Up!" />
      </div>
    </div>
  );
});

export default ProfileDialog;
